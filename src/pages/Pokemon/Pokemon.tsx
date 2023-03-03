import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IPokemon } from "../../@types"
import { fetchPokemon } from "../../api"
import Header from "../../components/Header/Header"
import ItemBlock from "../../components/ItemBlock/ItemBlock"
import { getPokemonImageURL } from "../../utils"

export default function Pokemon() {
  const { pokemonId } = useParams()
  const [pokemon, setPokemon] = useState<IPokemon | null>(null)

  useEffect(() => {
    fetchPokemon(pokemonId as string).then((poke) => {
      console.log(poke)
      setPokemon(poke)
    })
  }, [pokemonId])

  if (!pokemon) {
    return <p>Loading...</p>
  }

  return (
    <section>
      <Header />
      <div className="container">
        <div className="flex gap-x-4 mb-4">
          <div className="inline-flex border border-gray-200 dark:border-slate-700 rounded">
            <img
              src={getPokemonImageURL(pokemonId as string)}
              alt={pokemon.name}
            />
          </div>
          <hgroup>
            <h1 className="text-xl font-semibold">{pokemon?.name}</h1>
            <h2>{pokemon.species.name}</h2>
          </hgroup>
        </div>

        <div className="flex justify-start gap-x-14">
          <ItemBlock
            title="Info"
            content={[
              ["Experience:", pokemon.base_experience],
              ["Height:", pokemon.height],
              ["Weight:", pokemon.weight],
            ]}
          />

          <ItemBlock
            title="Stats"
            content={pokemon.stats.map((stat) => [stat.stat.name, null])}
          />

          <ItemBlock
            title="Abilities"
            content={pokemon.abilities.map((ability) => [
              ability.ability.name,
              null,
            ])}
          />

          <ItemBlock
            title="Types"
            content={pokemon.types.map((type) => [type.type.name, null])}
          />
        </div>
      </div>
    </section>
  )
}
