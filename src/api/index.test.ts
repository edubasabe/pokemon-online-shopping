import { mockPokemon, mockPokemons } from "./../mocks/handlers"
import * as api from "./index"

describe("api", () => {
  test("fetchPokemons", async () => {
    const mockRequest = vi.spyOn(api, "fetchPokemons")

    const pokemons = await api.fetchPokemons()

    expect(mockRequest).toBeCalled()
    expect(pokemons).toStrictEqual(mockPokemons)
  })

  test("fetchPokemon", async () => {
    const mockRequest = vi.spyOn(api, "fetchPokemon")
    const pokemon = await api.fetchPokemon("1")

    expect(mockRequest).toBeCalled()
    expect(pokemon).toStrictEqual(mockPokemon)
  })
})
