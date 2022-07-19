import React, { useEffect, useRef } from 'react'
import Loader from 'react-spinners/ScaleLoader'
import Image from '../Image'
import { HotKeys } from 'react-hotkeys'

const MoviePreview: React.FC<{ data: MovieInfo; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const date = data.release_date.split('-')

  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.focus()
    }
  }, [previewRef])

  const handlers = {
    BACK: () => {
      onClose()
    },
    MOVE_LEFT: (event: any) => {},
    MOVE_RIGHT: (event: any) => {},
  }

  return (
    <HotKeys
      handlers={handlers}
      allowChanges
      style={{ outline: 'none' }}
      innerRef={previewRef}>
      <div className='min-w-[1000px] px-10 text-amber-50'>
        <h2 className='text-4xl pb-8'>
          {data.title} ({date[0]})
        </h2>
        <div className='flex'>
          <div className='preview-container flex-1 '>
            <div className='flex min-h-[400px] h-[500px]'>
              <Image
                src={data.poster_path}
                loader={<Loader color='#fff' />}
                fallback={
                  <div className='text-amber-50 whitespace-pre-wrap'>
                    {data.title}
                  </div>
                }
                className='h-[500px] min-h-[400px] mx-auto'
              />
            </div>
            <div className='pt-20 flex justify-evenly'>
              <button className='rounded-md bg-orange-500 w-24 h-16'>
                Play
              </button>
              <button className='w-24 h-16 rounded-md'>Trailer</button>
              <button className='w-24 h-16 rounded-md'>Add to List</button>
            </div>
          </div>
          <div className='info-container w-[350px] px-6'>{data.overview}</div>
        </div>
      </div>
    </HotKeys>
  )
}

export default MoviePreview
