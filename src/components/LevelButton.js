import React from 'react'

const LevelButton = ({i, changeLevel}) => {
  return (
    <div className={i === 1 ? "level lvlCur" : "level"} id={`lvl${i}`} onClick={() => changeLevel(i, false)}>
        {i}
    </div>
  )
}

export default LevelButton