import { Anime as AnimeFromLib, AnimeClient } from '@tutkli/jikan-ts'
import { useEffect, useState } from "react";

const animeClient = new AnimeClient({
  cacheOptions: {
    ttl: 60 * 60 * 24, // 1 day
  },
  enableLogging: true,
})

const getAnimeSearch = async (page: number) => {
  const { data } = await animeClient.getAnimeSearch({
    sfw: true, unapproved: false, type: 'tv', limit: 25, page, sort: 'asc', order_by: 'popularity'
  })

  return data.map((anime: AnimeFromLib) => ({
      id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images.jpg.image_url,
      attributes: [
        ...anime.genres.map(genre => genre.name),
        ...anime.studios.map(studio => studio.name),
        ...anime.demographics.map(demographic => demographic.name),
      ],
    }),
  )
}

export type MappedAnime = Awaited<ReturnType<typeof getAnimeSearch>>[0]

export const useAnimes = () => {
  const [animes, setAnimes] = useState<null | MappedAnime[]>(null);
  const [currentAnime, setCurrentAnime] = useState<null | MappedAnime>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAnimes = async () => {
      setIsLoading(true)
      const animesResponse = await getAnimeSearch(1)

      setAnimes(animesResponse)
      setCurrentAnime(animesResponse[0])
      setIsLoading(false)
    }

    void getAnimes()
  }, []);

  const changeAnime = async (banList: string[]) => {
    if (!animes) {
      return null;
    }

    const animesWithoutCurrent = animes.filter(anime => anime.id !== currentAnime?.id);
    setAnimes(animesWithoutCurrent)

    const filteredAnimes = animesWithoutCurrent.filter(anime => anime.attributes.every(attribute => !banList.includes(attribute)))
    const nextAnime = filteredAnimes.find(anime => !banList.includes(anime.id.toString()))

    if (nextAnime) {
      setCurrentAnime(nextAnime)
      return;
    }

    setIsLoading(true)

    let nextPage = page + 1;
    while (true) {
      const nextAnimePage = await getAnimeSearch(nextPage)
      const nextAnimeFiltered = nextAnimePage.filter(anime => anime.attributes.every(attribute => !banList.includes(attribute)))

      if (nextAnimeFiltered.length > 0) {
        setAnimes([...animes, ...nextAnimeFiltered])
        setCurrentAnime(nextAnimeFiltered[0])
        setPage(nextPage)
        break;
      }

      nextPage++;
      await new Promise(resolve => setTimeout(resolve, 3000))
    }

    setIsLoading(false)
  }

  return {
    data: currentAnime,
    isLoading,
    changeAnime,
  }
}