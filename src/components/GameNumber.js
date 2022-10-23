import React from "react";
import "./GameNumber.css";

const GameNumber = ({ id, num, numID, handleNumberChange }) => {
  return (
    <div className="number" id={id} onClick={() => handleNumberChange(num, id)}>
      {num}
    </div>
  );
};

export default GameNumber;
