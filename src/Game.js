import React from 'react'
import {useState, useEffect} from 'react'
import "./Game.css";

const Game = () => {
    const [answer, setAnswer] = useState("?");


    const [number1, setNumber1] = useState("2");
    const [number2, setNumber2] = useState("5");
    const [number3, setNumber3] = useState("3");
    const [number4, setNumber4] = useState("0");

    const [currentOperator, setCurrentOperator] = useState("");
    const [operator1, setOperator1] = useState("");
    const [operator2, setOperator2] = useState("");
    const [operator3, setOperator3] = useState("");

    const logic = (op1, op2, op3) => {
      
      let l = [op1, op2, op3];
      
      for (let i = 0; i < l.length; i++){
        if (l[i] === "×"){
          l[i] = "*";
        }
        if (l[i] === "÷"){
          l[i] = "/";
        }
      }
      console.log((number1 + l[0] + number2 + l[1] + number3 + l[2] + number4 ))
      setAnswer(eval(number1 + l[0] + number2 + l[1] + number3 + l[2] + number4 ))    
    }

    useEffect( () => {
      if (operator1 !== "" && operator2 !== "" && operator3 !== ""){
        logic(operator1, operator2, operator3);
      }
    }, [operator1, operator2, operator3]);

    const holdBtn = (op) => {
      console.log(op);
      console.log(currentOperator);
      console.log(operator1);
      console.log(operator2);
      console.log(operator3);
      switch(currentOperator){
        case "op1": setOperator1(op); console.log(operator1); break;
        case "op2": setOperator2(op); break;
        case "op3": setOperator3(op); break;
      }
      }
    const subcenterAppear = [{ transform: 'scale(0)' }, {transform: 'scale(1)'}];
    const subcenterDissapear = [{transform: 'scale(1)'}, {transform: 'scale(0)'}];
    let subcenter = document.querySelector(".sub-center");
    /*subcenter.addEventListener("click", () => {
      subcenter.animate(subcenterAppear, {duration:1000, iterations:1})
    })
    */
    const handleClickOperator = (opID) => {
      let subcenter = document.querySelector(".sub-center");
      if (currentOperator === ""){
        document.querySelector(`#${opID}`).className += " active";
        subcenter.animate(subcenterAppear, {duration:300, iterations:1})
        setCurrentOperator(opID);
        subcenter.style.display = "block";
      } else if (currentOperator === opID) {
        document.querySelector(`#${currentOperator}`).className = "operator";
        subcenter.animate(subcenterDissapear, {duration:300, iterations:1})
        setCurrentOperator("");
        setTimeout(() => {
          subcenter.style.display = "none";
        }, 290) 
      } else {
        document.querySelector(`#${currentOperator}`).className = "operator";
        document.querySelector(`#${opID}`).className += " active";
        subcenter.animate(subcenterAppear, {duration:300, iterations:1})
        setCurrentOperator(opID);
      }
    }
  return (
    <>
    <div className="center">
      <h1>4 to 10</h1>
        <div className="answer"><p>{answer}</p></div>
        <div className="number"><p>{number1}</p></div>
        <div className="operator" id="op1" onClick={() => handleClickOperator("op1")}><p>{operator1}</p></div>
        <div className="number"><p>{number2}</p></div>
        <div className="operator" id="op2" onClick={() => handleClickOperator("op2")}><p>{operator2}</p></div>
        <div className="number"><p>{number3}</p></div>
        <div className="operator" id="op3" onClick={() => handleClickOperator("op3")}><p>{operator3}</p></div>
        <div className="number"><p>{number4}</p></div>
        
        {/*
        <button onClick={() => {logic(operator1, operator2, operator3)}}>logic</button>
        */}
    </div>
    <div className="sub-center">
      <div className="operator" onClick={() => {holdBtn("+")}}><p>+</p></div>
      <div className="operator" onClick={() => {holdBtn("-")}}><p>-</p></div>
      <div className="operator" onClick={() => {holdBtn("×")}}><p>×</p></div>
      <div className="operator" onClick={() => {holdBtn("÷")}}><p>÷</p></div>
    </div>
    </>
  )
}

export default Game