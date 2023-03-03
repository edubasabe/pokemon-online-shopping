import { render, screen } from "@testing-library/react"
import { mockPokemons } from "../../mocks/handlers"
import List from "./List"

vi.mock("react-router-dom")

describe("List", () => {
  test("should render the component", () => {
    const { container } = render(<List pokemons={[]} />)
    expect(container).toBeDefined()
  })

  test("should render the provided pokemons", () => {
    const mockedPokemons = mockPokemons.results.slice(0, 20)
    render(<List pokemons={mockedPokemons} />)

    expect(screen.getAllByTestId("pokemon-item", { exact: false }).length).toBe(
      mockedPokemons.length
    )
  })
})
