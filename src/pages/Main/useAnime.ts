import { AnimeClient, Anime as AnimeFromLib } from '@tutkli/jikan-ts'
import { useEffect, useState } from "react";

const animeClient = new AnimeClient({
  cacheOptions: {
    ttl: 60 * 60 * 24, // 1 day
  },
  enableLogging: true,
})

const mapAnimesOutput = ({ data, pagination }: Awaited<ReturnType<typeof animeClient.getAnimeSearch>>) => {
  return {
    data: data.map((anime: AnimeFromLib) => ({
      id: anime.mal_id,
      title: anime.title,
      imageUrl: anime.images.jpg.image_url,
      attributes: [
        ...anime.genres.map(genre => genre.name),
        ...anime.studios.map(studio => studio.name),
        ...anime.demographics.map(demographic => demographic.name),
      ],
    })),
    pagination: {
      has_next_page: pagination?.has_next_page ?? false,
    },
  }
}

export const useAnimes = () => {
  const [getAnimesOutput, setAnimesOutput] = useState<null | ReturnType<typeof mapAnimesOutput>>(null);
  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAnimes = async () => {
      setIsLoading(true)
      const res = await animeClient.getAnimeSearch({
        sfw: true,
        unapproved: false,
        type: 'tv',
        limit: 25,
        page,
      });

      const mappedRes = mapAnimesOutput(res);
      setAnimesOutput(mappedRes)
      setCurrentAnimeIndex(0)
      setIsLoading(false)
    }

    void getAnimes()
  }, [page]);

  const changeAnime = () => {
    if (!getAnimesOutput) {
      return null;
    }

    const nextAnime = getAnimesOutput.data[currentAnimeIndex + 1];

    if (nextAnime) {
      setCurrentAnimeIndex(currentAnimeIndex + 1)
    }

    if (!nextAnime) {
      setPage(page + 1)
    }
  }

  return {
    data: getAnimesOutput?.data[currentAnimeIndex],
    isLoading,
    changeAnime,
  }
}