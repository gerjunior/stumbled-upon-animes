import { Anime, useAnimes } from "./hooks/useAnime.ts";
import { Button } from "./components/Button.tsx";

type AnimeCardProps = {
  anime: Anime
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  if (!anime) {
    return <div className="">Loading...</div>
  }

  return (
    <div className="mx-auto w-2/5 text-white shadow-[#EEEEEE] h-4/5 shadow-2xl bg-[#222831] rounded-lg flex flex-col
    items-center flex flex-col flex-wrap justify-evenly">
      <p className="text-4xl py-3 px-2 font-bold">{ anime.title }</p>
      <img className="w-64" src={ anime.imageUrl } alt={ anime.title }/>
      <div className="flex flex-row flex-wrap w-full justify-center">
        { anime.attributes.map((attribute) => {
          return (
            <Button text={ attribute }/>
          )
        }) }
      </div>
      <div className="w-auto">
        <button className="bg-[#EEEEEE] text-[#393E46] text-white w-auto h-auto rounded-md shadow shadow-white">🔁
          Discover
        </button>
      </div>
    </div>
  )
}

export const App = () => {
  const { data } = useAnimes()

  return (
    <div className="w-screen h-screen mt-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold">Stumbled Upon: Animes</h1>
      <p className="text-2xl mt-5">Discover animes from your wildest dreams!</p>
      <div className="mt-10 w-full h-full">
        <AnimeCard anime={ data[0] }/>
      </div>
    </div>
  )
}