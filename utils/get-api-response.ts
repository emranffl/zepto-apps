export const getAPIResponse = async ({
  basePath = process.env.NEXT_PUBLIC_API_BASE_URL || "",
  apiPath,
  token = "",
  method = "GET",
  body = undefined,
  contentType = "application/json",
  revalidationTime = 0,
}: {
  basePath: string
  apiPath: string
  token: string
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS"
  body: FormData | string | null | undefined
  contentType: string
  revalidationTime: number
}) => {
  const headers: Record<string, string> = {
    Authorization: `${token}`,
    "Access-Control-Allow-Origin": "*",
  }
  headers["Content-Type"] = contentType

  const reqInit: RequestInit = {
    method: `${method}`,
    headers: headers,
    body: body || undefined,
  }

  if (revalidationTime == 0) {
    reqInit["next"] = { revalidate: false }
  } else {
    reqInit["next"] = { revalidate: revalidationTime }
  }

  const results = await fetch(`${basePath + apiPath}`, reqInit)
  return results.json()
}
