import React from 'react'

const GenreListItem: React.FC<{ label: string; isFocused: boolean }> = ({
  label,
  isFocused,
}) => (
  <div
    className={`capitalize text-2xl p-3 text-start outline-orange-500 rounded-md ${
      isFocused ? 'outline' : ''
    }`}>
    {label}
  </div>
)

export default GenreListItem
