import React from 'react'

const Number = ({id, num, numID, handleNumberChange}) => {
  return (
    <div className="number"
     id={id} onClick={() => handleNumberChange(num, id)}>{num}</div>

  )
}

export default Number