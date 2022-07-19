import React, { useEffect, useRef, useState } from 'react'
import GenreListItem from '../GenreListItem'
import { HotKeys } from 'react-hotkeys'

const GenreList: React.FC<{
  exploring: boolean
  items: string[]
  selectedGenre?: string
  selectGenre: (itemIdx: number) => void
  exploreGenre: () => void
}> = ({ exploring, items, selectGenre, selectedGenre, exploreGenre }) => {
  const [focusedItemIdx, setFocusedItemIdx] = useState<number>(
    selectedGenre ? items.indexOf(selectedGenre) : 0,
  )

  const genreAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!exploring) {
      genreAreaRef?.current?.focus()
    }
  }, [exploring])

  const handlers = {
    MOVE_UP: (event: any) =>
      setFocusedItemIdx((prevState) => {
        return Math.max(0, prevState - 1)
      }),
    MOVE_DOWN: (event: any) =>
      setFocusedItemIdx((prevState) => {
        return Math.min(items.length - 1, prevState + 1)
      }),
    SELECT: (event: any) => {
      event.preventDefault()
      selectGenre(focusedItemIdx)
      exploreGenre()
      return false
    },
  }

  return (
    <HotKeys
      handlers={handlers}
      allowChanges
      style={{ outline: 'none' }}
      innerRef={genreAreaRef}>
      <div className='px-10 text-amber-50 min-w-[380px] outline-none'>
        {items.map((item, idx) => {
          return (
            <GenreListItem
              key={item}
              label={item}
              isFocused={focusedItemIdx === idx}
            />
          )
        })}
      </div>
    </HotKeys>
  )
}

export default GenreList
