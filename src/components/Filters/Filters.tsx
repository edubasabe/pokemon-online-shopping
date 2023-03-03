import debounce from "lodash.debounce"

type FiltersProps = {
  onSearchChange: (search: string) => void
}

export default function Filters({ onSearchChange }: FiltersProps) {
  const debouncedSearch = debounce(async (search: string) => {
    onSearchChange(search.trim().toLowerCase())
  }, 500)

  return (
    <form>
      <label htmlFor="search">
        <h4 className="text-2xl font-bold mb-3">Search Pokemon</h4>
        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Enter pokemon name or ID"
        />
      </label>
    </form>
  )
}
