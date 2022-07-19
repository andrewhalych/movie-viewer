import React, { useState } from 'react'

const Image: React.FC<
  React.ImgHTMLAttributes<any> & {
    loader: React.ReactElement
    fallback: React.ReactNode
  }
> = ({ loader, src, fallback, ...rest }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const onLoadHandler = (e: any) => {
    setIsLoading(false)
  }

  const onErrorHandler = (e: any) => {
    setIsLoading(false)
    setIsError(true)
  }

  return (
    <>
      {isLoading && loader}
      {isError && fallback}
      {!isError && (
        <img
          style={{ display: isLoading ? 'none' : 'block' }}
          src={src}
          alt=''
          onLoad={onLoadHandler}
          onError={onErrorHandler}
          {...rest}
        />
      )}
    </>
  )
}

export default Image
