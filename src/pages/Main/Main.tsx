import { AnimeCard } from "./components/AnimeCard.tsx";
import { BanList } from "./components/BanList.tsx";
import { useState } from "react";
import { SeenSoFar } from "./components/SeenSoFar.tsx";
import { MappedAnime, useAnimes } from "./useAnime.ts";

export const Main = () => {
  const { changeAnime, data: currentAnime, isLoading } = useAnimes()
  const [banList, setBanList] = useState<string[]>([])
  const [seenSoFar, setSeenSoFar] = useState<MappedAnime[]>([])

  const handleRemoveFromBanList = (attribute: string) => {
    setBanList(banList.filter(item => item !== attribute));
  }

  const handleAddToBanList = (attribute: string) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  }

  const handleClickDiscover = async () => {
    if (currentAnime) {
      setSeenSoFar([...seenSoFar, currentAnime])
    }
    void changeAnime(banList)
  }

  return (
    <div className="w-screen h-screen mt-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold">Stumbled Upon: Animes</h1>
      <p className="text-2xl mt-5">Discover animes from your wildest dreams!</p>
      <div className="mt-10 w-full h-full">
        <SeenSoFar animesSeenSoFar={ seenSoFar }/>
        <AnimeCard handleClickAttribute={ handleAddToBanList } handleClickDiscover={ handleClickDiscover }
                   anime={ currentAnime } isLoading={ isLoading }/>
        <BanList banList={ banList } handleClickItem={ handleRemoveFromBanList }/>
      </div>
    </div>
  )
}