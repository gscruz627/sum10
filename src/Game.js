import React from 'react'
import {useState, useEffect} from 'react'
import "./Game.css";

const Game = () => {
    const [answer, setAnswer] = useState("?");


    const [currentNumber, setCurrentNumber] = useState({number: null, numID: null});
    const [number1, setNumber1] = useState("1");
    const [number2, setNumber2] = useState("5");
    const [number3, setNumber3] = useState("2");
    const [number4, setNumber4] = useState("3");

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
      let strToEval = eval(number1 + l[0] + number2 + l[1] + number3 + l[2] + number4 );
      console.log((number1 + l[0] + number2 + l[1] + number3 + l[2] + number4 ))
      setAnswer(strToEval);
    
      if(countDecimals(strToEval) > 3){
        setAnswer(Number(strToEval).toFixed(2))
      }
    }

    useEffect( () => {
      if (operator1 !== "" && operator2 !== "" && operator3 !== ""){
        logic(operator1, operator2, operator3);
      }
    }, [operator1, operator2, operator3, number1, number2, number3, number4]);

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
    
    const handleNumberChange = (n, nID) => {
      if (!(currentNumber.numID)){
        setCurrentNumber({number:n, numID:nID});
        document.querySelector(`#${nID}`).style.color = "#00FF00";
        console.log(currentNumber.numID + " " + currentNumber.number)
      } else{
        console.log(currentNumber.numID)
        document.querySelector(`#${currentNumber.numID}`).style.color = "white";
        switch(currentNumber.numID){
          case "n1": setNumber1(n); break;
          case "n2": setNumber2(n); break;
          case "n3": setNumber3(n); break;
          case "n4": setNumber4(n);
        }
        switch(nID){
          case "n1": setNumber1(currentNumber.number); break;
          case "n2": setNumber2(currentNumber.number); break;
          case "n3": setNumber3(currentNumber.number); break;
          case "n4": setNumber4(currentNumber.number);
        }
        setCurrentNumber({number:null, numID:null});
      }
    }

    // Credits to David Wyness in StackOverFlow.
    function countDecimals(decimal)
    {
    var num = parseFloat(decimal); // First convert to number to check if whole

    if(Number.isInteger(num) === true)
      {
      return 0;
      }

    var text = num.toString(); // Convert back to string and check for "1e-8" numbers
    
    if(text.indexOf('e-') > -1)
      {
      var [base, trail] = text.split('e-');
      var deg = parseInt(trail, 10);
      return deg;
      }
    else
      {
      var index = text.indexOf(".");
      return text.length - index - 1; // Otherwise use simple string function to count
      }
    }
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
        <div className="number" id="n1" onClick={() => handleNumberChange(number1, "n1")}><p>{number1}</p></div>
        <div className="operator" id="op1" onClick={() => handleClickOperator("op1")}><p>{operator1}</p></div>
        <div className="number" id="n2" onClick={() => handleNumberChange(number2, "n2")}><p>{number2}</p></div>
        <div className="operator" id="op2" onClick={() => handleClickOperator("op2")}><p>{operator2}</p></div>
        <div className="number" id="n3" onClick={() => handleNumberChange(number3, "n3")}><p>{number3}</p></div>
        <div className="operator" id="op3" onClick={() => handleClickOperator("op3")}><p>{operator3}</p></div>
        <div className="number" id="n4" onClick={() => handleNumberChange(number4, "n4")}><p>{number4}</p></div>
        
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