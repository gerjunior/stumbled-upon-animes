import { Button } from "../../../components/Button.tsx";
import { Anime } from "../useAnime.ts";

type AnimeCardProps = {
  anime: Anime;
  handleClickAttribute: (attribute: string) => void;
  banList: string[];
}

export const AnimeCard = ({ anime, handleClickAttribute, banList }: AnimeCardProps) => {
  if (!anime) {
    return <div className="">Loading...</div>
  }

  const filteredAttributes = anime.attributes.filter((attribute) => !banList.includes(attribute))

  return (
    <div className="mx-auto w-2/5 text-white shadow-[#EEEEEE] h-4/5 shadow-2xl bg-[#222831] rounded-lg
    items-center flex flex-col flex-wrap justify-evenly">
      <p className="text-4xl py-3 px-2 font-bold">{ anime.title }</p>
      <img className="w-64" src={ anime.imageUrl } alt={ anime.title }/>
      <div className="flex flex-row flex-wrap w-full justify-center">
        { filteredAttributes.map((attribute) => {
          return (
            <Button text={ attribute } onClick={handleClickAttribute}/>
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