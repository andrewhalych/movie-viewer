import React from 'react'
import Loader from 'react-spinners/ScaleLoader'
import Image from '../Image'

const MovieCard: React.FC<{
  poster_path: string
  isHighlighted: boolean
  title: string
}> = ({ poster_path, title, isHighlighted }) => {
  return (
    <div
      className={`flex items-center justify-center 3xl:w-[350px] 2xl:w-[250px] xl:w-[200px] lg:w-[150px] outline-orange-500 rounded-md ${
        isHighlighted ? 'outline' : ''
      }`}>
      <Image
        loader={<Loader color='#fff' />}
        fallback={
          <div className='text-amber-50 whitespace-pre-wrap'>{title}</div>
        }
        src={poster_path}
        className='object-cover h-full'
        alt={title}
      />
    </div>
  )
}

export default MovieCard
