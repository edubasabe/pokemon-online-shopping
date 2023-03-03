import { Link } from "react-router-dom"
import { Result } from "../../@types"
import { extractId, getPokemonImageURL } from "../../utils"

type ListProps = {
  pokemons: Result[]
}
export default function List({ pokemons }: ListProps) {
  return (
    <section
      data-testid="content-state"
      className="mb-0 overflow-y-auto h-[calc(100vh_-_40vh)]"
    >
      <ul className="w-full p-4">
        {pokemons.map((pokemon) => {
          const id = extractId(pokemon.url)

          return (
            <li
              data-testid={`pokemon-item-${id}`}
              className="flex border-b border-gray-100 dark:border-slate-700 last:border-b-transparent"
              key={id}
            >
              <Link
                to={`/pokemon/${id}`}
                className="flex items-center gap-x-2 w-full"
              >
                <div className="inline-flex ">
                  <img
                    src={getPokemonImageURL(id)}
                    alt={pokemon.name}
                    className="w-12"
                  />
                </div>
                <h4 className="font-semibold">{pokemon.name}</h4>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
