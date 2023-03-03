import { extractId, getPokemonImageURL, getURLParam } from "."
describe("utils", () => {
  test("should extract the id ", () => {
    const url = "https://pokeapi.co/api/v2/pokemon/60/"
    expect(extractId(url)).toBe("60")
  })

  test("should return pokemon image url", () => {
    const id = "20"
    expect(getPokemonImageURL(id)).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png"
    )
  })

  test("should return a url param", () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=200"
    expect(getURLParam(url, "limit")).toBe("200")
    expect(getURLParam(url, "unknown")).toBe("")
  })
})
