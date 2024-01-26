import type { MappedAnime } from "../useAnime.ts";

type SeenSoFarProps = {
  animesSeenSoFar: MappedAnime[]
}

export const SeenSoFar = ({ animesSeenSoFar }: SeenSoFarProps) => {
  return (
    <div
      className="fixed top-0 left bottom-0 h-screen overflow-y-scroll w-2/12 flex justify-start items-center center flex-col">
      <div className="text-2xl mt-5 text-center">What have we seen so far?</div>
      <div className="flex flex-col items-center">
        { animesSeenSoFar.map((anime, idx) => {
          return (
            <div key={ idx } className="flex flex-col items-center mt-5">
              <p className="text-xl mb-2" >{ anime.title }</p>
              <img className="w-32 mb-5" src={ anime?.imageUrl } alt={ anime?.title }/>
            </div>
          )
        }) }
      </div>
    </div>
  )
}