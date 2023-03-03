type PaginationProps = {
  pagination: number
  onSelectChange: (selected: number) => void
}
export default function Pagination({
  pagination,
  onSelectChange,
}: PaginationProps) {
  return (
    <div>
      <h4 className="text-2xl font-bold mb-3">Pagination</h4>

      <label htmlFor="pokemon-select" className="font-semibold">
        Pokemons per page
      </label>
      <select
        id="pokemon-select"
        data-testid="pokemons-per-page"
        value={pagination}
        className="h-12 mb-4"
        onChange={(e) => onSelectChange(+e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  )
}
