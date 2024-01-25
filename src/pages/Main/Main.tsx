import { AnimeCard } from "./components/AnimeCard.tsx";
import { BanList } from "./components/BanList.tsx";
import { useState } from "react";

export const Main = () => {
  const [banList, setBanList] = useState<string[]>([])

  const handleRemoveFromBanList = (attribute: string) => {
    setBanList(banList.filter(item => item !== attribute));
  }

  const handleAddToBanList = (attribute: string) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  }

  return (
    <div className="w-screen h-screen mt-10 flex flex-col items-center">
      <h1 className="text-5xl font-bold">Stumbled Upon: Animes</h1>
      <p className="text-2xl mt-5">Discover animes from your wildest dreams!</p>
      <div className="mt-10 w-full h-full">
        <AnimeCard banList={banList} handleClickAttribute={handleAddToBanList}/>
        <BanList banList={banList} handleClickItem={handleRemoveFromBanList} />
      </div>
    </div>
  )
}