import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Pagination from "./Pagination"

describe("Pagination", () => {
  test("should render the component", () => {
    const onSelectChangeSpy = vi.fn()

    const { container } = render(
      <Pagination pagination={20} onSelectChange={onSelectChangeSpy} />
    )
    expect(container).toBeDefined()
  })

  test("should set the initial selection", () => {
    const onSelectChangeSpy = vi.fn()

    render(<Pagination pagination={20} onSelectChange={onSelectChangeSpy} />)

    const pokemonsPerPage = screen.getByTestId(
      "pokemons-per-page"
    ) as HTMLSelectElement

    expect(pokemonsPerPage.value).toBe("20")
  })

  test("should emit the selection changed", async () => {
    const onSelectChangeSpy = vi.fn()

    render(<Pagination pagination={20} onSelectChange={onSelectChangeSpy} />)
    screen.getByTestId("pokemons-per-page") as HTMLSelectElement

    fireEvent.change(screen.getByTestId("pokemons-per-page"), {
      target: { value: "50" },
    })

    await waitFor(() => expect(onSelectChangeSpy).toBeCalledWith(50))
  })
})
