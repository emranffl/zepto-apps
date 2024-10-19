import { QUERY } from "@/query.config"
import { getBookDetails } from "@/services/api/book-details"
import { QueryClient } from "@tanstack/react-query"
import BookDetails from "./BookDetails.Client"

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const serverQueryClient = new QueryClient()
  const data = await serverQueryClient.fetchQuery({
    queryKey: [QUERY.BOOK.DYNAMIC(id).key],
    queryFn: async () => await getBookDetails(id),
  })

  return (
    <>
      <section className="container h-full space-y-12 py-16 sm:py-24">
        {/* <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre> */}
        <BookDetails {...data} />
      </section>
    </>
  )
}

export default Page
