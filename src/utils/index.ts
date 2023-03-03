export const extractId = (url: string) => {
  const startIndex = url.indexOf("pokemon") + 7
  return url.substring(startIndex).replace(/\//g, "")
}

export const getPokemonImageURL = (id: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const getURLParam = (url: string, param: string) => {
  const urlParams = new URL(url).searchParams
  return urlParams.get(param) ?? ""
}
