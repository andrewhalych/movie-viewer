import React from 'react'

const FlexContainer: React.FC<{
  children: React.ReactNode
  selection: boolean
}> = ({ children, selection }) => (
  <div
    className={`flex overflow-visible transform-gpu transition-transform ${
      selection ? '-translate-x-[800px]' : ''
    }`}>
    {children}
  </div>
)

export default FlexContainer
