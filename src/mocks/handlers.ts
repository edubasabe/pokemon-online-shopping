import { rest } from "msw"
import pokemon from "../data/pokemon"
import pokemons from "../data/pokemons"

export const mockPokemons = {
  count: 1279,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: pokemons,
}

export const mockPokemon = pokemon

export const handlers = [
  rest.get("https://pokeapi.co/api/v2/pokemon", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPokemons))
  }),
  rest.get("https://pokeapi.co/api/v2/pokemon/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockPokemon))
  }),
]
