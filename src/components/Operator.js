import React from "react";
import "./Operator.css"

const Operator = ({
  currentOP,
  id,
  onClick,
  children,
  handleClickOperator,
  holdBtn,
}) => {
  if (!children) {
    return (
      <div className="operator" id={id} onClick={() => handleClickOperator(id)}>
        <p>{currentOP}</p>
      </div>
    );
  } else {
    return (
      <div className="operator" id={id} onClick={() => holdBtn(id)}>
        {children}
      </div>
    );
  }
};

export default Operator;
