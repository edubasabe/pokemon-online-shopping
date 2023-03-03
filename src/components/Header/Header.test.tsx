import { render } from "@testing-library/react"
import Header from "./Header"

describe("Header", () => {
  test("should render the component", () => {
    const { container } = render(<Header />)
    expect(container).toBeDefined()
  })
})
