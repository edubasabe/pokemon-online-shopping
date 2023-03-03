import axios from "axios"
import { AllPokemons, IPokemon } from "./../@types"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
})

export const fetchPokemons = async (
  params?: Record<string, string | number>
) => {
  return (
    await api.get<AllPokemons>("/pokemon", {
      params,
    })
  ).data
}

export const fetchPokemon = async (
  id: string,
  params: Record<string, string | number> = {}
) => {
  return (
    await api.get<IPokemon>(`/pokemon/${id}`, {
      params,
    })
  ).data
}
