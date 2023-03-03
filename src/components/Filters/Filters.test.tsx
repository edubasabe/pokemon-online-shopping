import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import Filters from "./Filters"

describe("Filters", () => {
  test("should render the component", () => {
    const onSearchChangeSpy = vi.fn()
    const { container } = render(<Filters onSearchChange={onSearchChangeSpy} />)
    expect(container).toBeDefined()
  })

  test("should emit search event", async () => {
    const onSearchChangeSpy = vi.fn()
    render(<Filters onSearchChange={onSearchChangeSpy} />)

    fireEvent.change(screen.getByPlaceholderText("Enter pokemon name or ID"), {
      target: { value: "charmander" },
    })

    await waitFor(() => expect(onSearchChangeSpy).toBeCalledWith("charmander"))
  })
})
