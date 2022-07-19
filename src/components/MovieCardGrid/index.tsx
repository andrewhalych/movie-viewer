import React, { useEffect, useRef, useState } from 'react'
import { HotKeys } from 'react-hotkeys'
import MovieCard from '../MovieCard'
import ErrorBoundary from '../MovieCard/error-boundary'

const MovieCardGrid: React.FC<{
  exploring: boolean
  items: MovieInfo[]
  onMovieSelect: (index: number) => void
  onBack: () => void
  selectedMovie: MovieInfo | null
}> = ({ exploring, items, onMovieSelect, onBack, selectedMovie }) => {
  const focusAreaRef = useRef<HTMLDivElement>(null)
  const [focusedItemIdx, setFocusedItemIdx] = useState<number>(0)

  useEffect(() => {
    if (exploring && !selectedMovie) {
      focusAreaRef?.current?.focus()
    }
  }, [exploring, selectedMovie])

  const handlers = {
    MOVE_RIGHT: () => {
      setFocusedItemIdx((prevState) => {
        return Math.min(items.length - 1, prevState + 1)
      })
    },
    MOVE_LEFT: () => {
      setFocusedItemIdx((prevState) => {
        return Math.max(0, prevState - 1)
      })
    },
    MOVE_UP: (event: any) =>
      setFocusedItemIdx((prevState) => {
        return Math.max(0, prevState - 1 - 5)
      }),
    MOVE_DOWN: (event: any) =>
      setFocusedItemIdx((prevState) => {
        return Math.min(items.length - 1, prevState + 1 + 5)
      }),
    BACK: () => {
      onBack()
    },
    SELECT: (event: any) => {
      event.preventDefault()
      onMovieSelect(focusedItemIdx)
      return false
    },
  }

  return (
    <HotKeys
      handlers={handlers}
      allowChanges
      style={{ outline: 'none' }}
      innerRef={focusAreaRef}>
      <div className='grid-container flex-[1_1_50%]'>
        <div className='flex-1 grid 3xl:grid-cols-[repeat(5,350px)] 2xl:grid-cols-[repeat(5,250px)] xl:grid-cols-[repeat(4,300px)] lg:grid-cols-[repeat(4,250px)] gap-4'>
          {items.map((item, idx) => {
            return (
              <ErrorBoundary key={item.title + idx}>
                <MovieCard
                  key={item.title + idx}
                  poster_path={item.poster_path}
                  title={item.title}
                  isHighlighted={exploring && focusedItemIdx === idx}
                />
              </ErrorBoundary>
            )
          })}
        </div>
      </div>
    </HotKeys>
  )
}

export default MovieCardGrid
