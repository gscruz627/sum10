import React from 'react'

const LevelButton = ({i, changeLevel, level}) => {
  return (
    <div className={i === level ? "level lvlCur" : "level"} id={`lvl${i}`} onClick={() => changeLevel(i, false)}>
        {i}
    </div>
  )
}

export default LevelButton