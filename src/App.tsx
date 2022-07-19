import React, { useState } from 'react'
import './App.css'
import { useQuery } from 'react-query'
import AppHeader from './components/AppHeader'
import FlexContainer from './components/FlexContainer'
import GenreList from './components/GenreList'
import MovieCardGrid from './components/MovieCardGrid'
import MoviePreview from './components/MoviePreview'
import { HotKeys } from 'react-hotkeys'

const initialData = { genres: [], movies: [] }

const keyMap = {
  MOVE_UP: 'up',
  MOVE_DOWN: 'down',
  MOVE_LEFT: 'left',
  MOVE_RIGHT: 'right',
  BACK: ['b', 'backspace'],
  SELECT: 'enter',
}

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieInfo | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<string>()
  const [exploringGenre, setExploringGenre] = useState<boolean>(false)

  const { data = initialData } = useQuery(
    'data',
    async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/bdiadiun/technical-assignments/main/movieDataCollection.json',
      )

      const data = (await response.json()) as Array<MovieInfo>
      const genreArr: string[] = []

      const genres = data.reduce((acc, item) => {
        acc = acc.concat(item.genre_ids)
        return acc
      }, genreArr)

      return {
        genres: [...new Set(genres)].sort(),
        movies: data,
      }
    },
    { initialData: initialData },
  )

  const selectMovie = (index: number) => {
    setSelectedMovie(
      data.movies.filter((item) => {
        return selectedGenre ? item.genre_ids.includes(selectedGenre) : item
      })[index],
    )
  }

  const selectGenre = (genreIndex: number) => {
    setSelectedGenre(data.genres[genreIndex])
  }

  const exploreGenre = () => {
    setExploringGenre(true)
  }

  const backToGenres = () => {
    setExploringGenre(false)
  }

  const closePreview = () => {
    setSelectedMovie(null)
  }

  return (
    <HotKeys keyMap={keyMap}>
      <div className='App bg-gray-900 min-h-screen h-full '>
        <AppHeader />
        <FlexContainer selection={!!selectedMovie}>
          <GenreList
            exploring={exploringGenre}
            exploreGenre={exploreGenre}
            items={data.genres}
            selectGenre={selectGenre}
            selectedGenre={selectedGenre}
          />
          <MovieCardGrid
            selectedMovie={selectedMovie}
            exploring={exploringGenre}
            items={data.movies.filter((item) => {
              return selectedGenre
                ? item.genre_ids.includes(selectedGenre)
                : item
            })}
            onBack={backToGenres}
            onMovieSelect={selectMovie}
          />
          {selectedMovie && (
            <MoviePreview data={selectedMovie} onClose={closePreview} />
          )}
        </FlexContainer>
      </div>
    </HotKeys>
  )
}

export default App
