import { Button } from "../../../components/Button.tsx";
import { MappedAnime } from "../useAnime.ts";

type AnimeCardProps = {
  handleClickAttribute: (attribute: string) => void;
  handleClickDiscover: () => void;
  anime: MappedAnime | null;
  isLoading: boolean
}

export const AnimeCard = ({ handleClickAttribute, handleClickDiscover, anime, isLoading }: AnimeCardProps) => {
  return (
    <div className="mx-auto w-2/5 text-white shadow-[#EEEEEE] h-4/5 shadow-2xl bg-[#222831] rounded-lg
    items-center flex flex-col flex-wrap justify-evenly">
      <p className="text-4xl py-3 px-2 font-bold">{ anime?.title }</p>
      <img className="w-64" src={ anime?.imageUrl } alt={ anime?.title }/>
      <div className="flex flex-row flex-wrap w-full justify-center">
        { anime?.attributes.map((attribute, idx) => {
          return (
            <Button key={ idx } text={ attribute } onClick={ handleClickAttribute }/>
          )
        }) }
      </div>
      <div className="w-auto">
        <button
          onClick={ handleClickDiscover }
          disabled={ isLoading }
          className="bg-[#EEEEEE] text-[#393E46] text-black w-auto h-auto rounded-md shadow shadow-white">🔁
          Discover
        </button>
      </div>
    </div>
  )
}