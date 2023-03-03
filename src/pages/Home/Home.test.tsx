import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import * as api from "../../api"
import Home from "./Home"

vi.mock("react-router-dom")
describe("Home", () => {
  beforeEach(() => {
    render(<Home />)
  })

  test("should render the components", async () => {
    const { container } = render(<Home />)
    expect(container).toBeDefined()
  })

  test("should fetch the pokemons", async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId("empty-state"))

    expect(screen.queryByTestId("content-state")).toBeDefined()

    const pokemonsPerPage = screen.getByTestId(
      "pokemons-per-page"
    ) as HTMLSelectElement

    expect(screen.getAllByTestId("pokemon-item", { exact: false }).length).toBe(
      +pokemonsPerPage.value
    )
  })

  test("should filter by name", async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId("empty-state"))

    fireEvent.change(screen.getByPlaceholderText("Enter pokemon name or ID"), {
      target: { value: "charmander" },
    })

    await waitFor(() =>
      expect(
        screen.getAllByTestId("pokemon-item", {
          exact: false,
        }).length
      ).toBe(1)
    )

    expect(screen.getAllByTestId("pokemon-item-4")).toBeDefined()
  })

  test("should filter by id", async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId("empty-state"))

    fireEvent.change(screen.getByPlaceholderText("Enter pokemon name or ID"), {
      target: { value: "12" },
    })

    await waitFor(() =>
      expect(
        screen.getAllByTestId("pokemon-item", {
          exact: false,
        }).length
      ).toBe(1)
    )

    expect(screen.getAllByTestId("pokemon-item-12")).toBeDefined()
  })

  test("should show no results", async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId("empty-state"))

    fireEvent.change(screen.getByPlaceholderText("Enter pokemon name or ID"), {
      target: { value: "8888" },
    })

    await waitFor(() =>
      expect(
        screen.getByText(
          "There are no Pokemons matching the search criteria :("
        )
      )
    )
  })

  test("should change the pagination size", async () => {
    fireEvent.change(screen.getByTestId("pokemons-per-page"), {
      target: { value: "50" },
    })

    await waitFor(() =>
      expect(
        screen.getAllByTestId("pokemon-item", {
          exact: false,
        }).length
      ).toBe(50)
    )
  })

  test("should go to next page", async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId("empty-state"))

    expect(screen.getByText("Page 1 of 64")).toBeDefined()
    expect(screen.queryByTestId("pagination-prev")).toBeNull()

    fireEvent.click(screen.getByTestId("pagination-next"))

    expect(screen.getByText("Page 2 of 64")).toBeDefined()
    expect(screen.queryByTestId("pagination-prev")).toBeDefined()
  })

  test("should go to previous page", async () => {
    await waitForElementToBeRemoved(() => screen.getByTestId("empty-state"))

    expect(screen.getByText("Page 1 of 64")).toBeDefined()
    expect(screen.queryByTestId("pagination-prev")).toBeNull()

    fireEvent.click(screen.getByTestId("pagination-next"))
    expect(screen.getByText("Page 2 of 64")).toBeDefined()

    fireEvent.click(screen.getByTestId("pagination-prev"))
    expect(screen.getByText("Page 1 of 64")).toBeDefined()
  })

  test("should show the error state", async () => {
    const mockRequest = vi.spyOn(api, "fetchPokemons")
    mockRequest.mockRejectedValue({})

    waitFor(() =>
      expect(
        screen.getByText(
          "There was an error trying to load the Pokemon's API :("
        )
      )
    )
    mockRequest.mockClear()
  })
})
