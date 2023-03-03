import { useEffect, useMemo, useState } from "react"
import { IPagination, Result } from "../../@types"
import { fetchPokemons } from "../../api"
import Filters from "../../components/Filters/Filters"
import Header from "../../components/Header/Header"
import List from "../../components/List/List"
import Pagination from "../../components/Pagination/Pagination"
import { extractId } from "../../utils"

function Home() {
  const [pokemons, setPokemons] = useState<Result[]>([])
  const [apiError, setApiError] = useState(false)

  const [pagination, setPagination] = useState<IPagination>({
    totalItems: 0,
    nextPage: "",
    prevPage: "",
    itemsPerPage: 20,
    pageNumber: 1,
  })

  const [searchText, setSearchText] = useState<string>("")

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const { results } = await fetchPokemons({ limit: 2000 })
        const resultsWithID = results.map((result) => ({
          ...result,
          id: extractId(result.url),
        }))

        setPokemons(resultsWithID)
      } catch (e) {
        console.log(e)
        setApiError(true)
      }
    }
    loadPokemons()
  }, [])

  const filteredPokemons = useMemo<Result[]>(() => {
    const offset = (pagination.pageNumber - 1) * pagination.itemsPerPage + 1
    if (searchText.length > 0 || offset > 1) {
      return pokemons
        .filter(
          (result) =>
            Number(result.id) === Number(searchText) ||
            result.name.includes(searchText)
        )
        .slice(offset - 1, pagination.itemsPerPage * pagination.pageNumber)
    }
    return pokemons.slice(0, pagination.itemsPerPage)
  }, [searchText, pokemons, pagination])

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
    }))
  }

  const handlePrev = () => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber - 1,
    }))
  }

  if (apiError) {
    return (
      <section className="mb-0">
        <Header />
        <main className="container flex items-center justify-center gap-x-12 min-h-[80vh]">
          <h2 className="text-2xl font-bold">
            There was an error trying to load the Pokemon's API :(
          </h2>
        </main>
      </section>
    )
  }

  const totalPages = Math.ceil(pokemons.length / pagination.itemsPerPage)

  return (
    <section className="mb-0">
      <Header />
      <main className="container flex gap-x-12">
        <aside className="flex-1">
          <Filters onSearchChange={(search) => setSearchText(search)} />
          <Pagination
            pagination={pagination.itemsPerPage}
            onSelectChange={(selected) =>
              setPagination((prev) => ({ ...prev, itemsPerPage: selected }))
            }
          />
        </aside>

        <article className="flex-[3] my-0 p-0">
          <div className="flex justify-between p-4 border-b dark:border-slate-800">
            <div className="text-sm">
              Showing {filteredPokemons.length} of {pokemons.length}
            </div>
            <div className="text-sm">
              Page {pagination.pageNumber} of {totalPages}
            </div>
          </div>
          {filteredPokemons.length ? (
            <List pokemons={filteredPokemons} />
          ) : (
            <section
              data-testid="empty-state"
              className="flex items-center justify-center h-[calc(100vh_-_40vh)] mb-0"
            >
              <h4 className="font-bold">
                There are no Pokemons matching the search criteria :(
              </h4>
            </section>
          )}
          <div className="flex justify-between p-4 border-t dark:border-slate-800">
            {pagination.pageNumber > 1 && (
              <button
                data-testid="pagination-prev"
                onClick={handlePrev}
                className="w-auto font-semibold px-6 h-10"
              >
                Previous
              </button>
            )}

            {pagination.pageNumber < totalPages && (
              <button
                data-testid="pagination-next"
                onClick={handleNext}
                className="w-auto font-semibold px-6 h-10 ml-auto"
              >
                Next
              </button>
            )}
          </div>
        </article>
      </main>
    </section>
  )
}

export default Home
