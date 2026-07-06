import React from 'react'
import Button from './Button'

const list = ["All", "Music", "Movies", "Sports", "News", "Comedy", "Education", "Live", "Science", "Fashion", "Health", "Food", "Travel"];

const ButtonList = () => {
  return (
    <div className='flex'>
      {list.map((name) => (
        <Button key={name} name={name} />
      ))}
    </div>
  )
};

export default ButtonList;