import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get("page") || 1
  const search = searchParams.get("search") || ""
  const topic = searchParams.get("topic") || ""
  const wishlistIds = searchParams.get("ids") || undefined

  try {
    let url = process.env.API_BASE_URL!

    if (search) {
      url += `/books?page=${page}&search=${encodeURI(search)}`
    } else if (topic) {
      url += `/books?topic=${topic}`
    } else if (wishlistIds) {
      url += `/books?ids=${wishlistIds}`
    } else {
      url += `/books?page=${page}`
    }

    const response = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(60_000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch data` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 })
  }
}
