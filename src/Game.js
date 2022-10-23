/*
  Made by Gustavo La Cruz
  Not copyrighted under any licence
  Feel free to use, copy, redistribute the code (or the game)

  I am fully aware the code could be way refactored
  feel free to contribute it / propose solutions in the Github page
*/

import React from "react";
import { useState, useEffect } from "react";
import "./Game.css";
import levels from "./levels";
import LevelButton from "./components/LevelButton";
import Operator from "./components/Operator";
import GameNumber from "./components/GameNumber";

const Game = () => {
  // Sets the states
  const [answer, setAnswer] = useState("?");
  const [level, setLevel] = useState(1);
  const [maxlevel, setMaxLevel] = useState(1);

  const [currentNumber, setCurrentNumber] = useState({
    number: null,
    numID: null,
  });
  const [numbers, setNumbers] = useState([
    { number: levels[0].number1, numID: "n1" },
    { number: levels[0].number2, numID: "n2" },
    { number: levels[0].number3, numID: "n3" },
    { number: levels[0].number4, numID: "n4" },
  ]);

  const [currentOperator, setCurrentOperator] = useState("");
  const operatorList = ["+", "-", "×", "÷"];
  const [operators, setOperators] = useState([
    { op: "", opID: "op1" },
    { op: "", opID: "op2" },
    { op: "", opID: "op3" },
  ]);

  //Sets the element queries to make the easier to access to
  const DOManswer = document.querySelector(".answer");
  const DOMcenter = document.querySelector(".center");
  const DOMcover = document.querySelector(".cover");

  // logic is the main core of the game, returns a change on answer based on current inputs
  const logic = () => {
    //Checks if any operator is times or divide and covert to valid arithmetic operators
    let evalOperators = [];
    for (let i = 0; i < operators.length; i++) {
      if (operators[i].op === "×") {
        evalOperators.push("*");
      } else if (operators[i].op === "÷") {
        evalOperators.push("/");
      } else {
        evalOperators.push(operators[i].op);
      }
    }

    //eval is used to convert operators with numbers and build an arithmetic operation
    let strToEval = eval(
      numbers[0].number +
        evalOperators[0] +
        numbers[1].number +
        evalOperators[1] +
        numbers[2].number +
        evalOperators[2] +
        numbers[3].number
    );
    if (String(strToEval).indexOf(".") > -1) {
      strToEval = strToEval.toFixed(2);
    }
    setAnswer(strToEval);

    //If answer is a repeating decimal, round to 2 decimals.
  };

  //Responsible for managing the end of the game in success.
  const gameReachesTen = () => {
    //Once you win, the screen is not clickeable (zIndex), and the answer and border are green
    DOManswer.style.color = "#10FF10";
    DOMcover.style.zIndex = "1";
    DOMcenter.style.border = "3px solid #10FF10";

    //After three seconds, screen is  clickeable again,
    setTimeout(() => {
      DOMcover.style.zIndex = "-1";
      DOMcenter.style.border = "none";

      //Level is changed for the next level and a new maxLevel is set.
      DOManswer.style.color = "white";
      document.getElementById(`lvl${level}`).style.backgroundColor = "green";
      console.log("this will be the next max level" + Number(level + 1));
      console.log("this is the max level: " + maxlevel);
      if (Number(level + 1) >= maxlevel) setMaxLevel(level + 1);
      changeLevel(level + 1, true);
    }, 3000);
  };

  //UseEffect runs on any operator or number change and executes logic
  useEffect(() => {
    //Checks if all operators have a value, and then if the answer equates to ten
    if (
      operators[0].op !== "" &&
      operators[1].op !== "" &&
      operators[2].op !== ""
    ) {
      if (answer === 10) {
        gameReachesTen();
      } else {
        DOManswer.style.color = "white";
      }
      logic();
    }
  }, [operators, numbers, answer, currentNumber]);

  //This function runs to select the operator, it will set
  const holdBtn = (op) => {
    let cutOP = currentOperator[2] - 1;
    let newOperators = [...operators];
    newOperators[cutOP].op = op;
    console.log(newOperators);
    setOperators(newOperators);
  };
  const subcenterAppear = [
    { transform: "scale(0)" },
    { transform: "scale(1)" },
  ];
  const subcenterDissapear = [
    { transform: "scale(1)" },
    { transform: "scale(0)" },
  ];
  const changeLevel = (lvl, passed) => {
    if (maxlevel >= lvl || passed) {
      setLevel(lvl);
      let newNumbers = numbers;
      let newOperators = operators;
      for (let i = 0; i < 4; i++) {
        newNumbers[i].number = levels[lvl - 1][`number${i + 1}`];
        if (i < 3) {
          newOperators[i].op = "";
        }
      }
      setNumbers(newNumbers);
      setOperators(newOperators);
      try {
        document.querySelector(`#${currentNumber.numID}`).style.color = "white";
      } catch (e) {}
      setCurrentNumber("");
      setAnswer("?");
    } else {
      console.log(maxlevel);
      alert("Complete previous levels first");
    }
  };

  // Handle the change of the numbers order, it is called when the user clicks on a number
  // to change or if the user is 'droping' the number onto a new sport.
  // n denotes the number itself being clicked
  // nID denotes the 'id' attribute of the html element
  const handleNumberChange = (n, nID) => {
    if (!currentNumber.numID) {
      setCurrentNumber({ number: n, numID: nID });
      document.querySelector(`#${nID}`).style.color = "#00FF00";
    } else {
      document.querySelector(`#${currentNumber.numID}`).style.color = "white";
      let newNumbers = numbers;
      console.log(
        `The current values are: ID:${currentNumber.numID}, value:${currentNumber.number}`
      );
      console.log(`Values of tile clicked: ID:${nID}, value:${n}`);
      console.log(newNumbers[nID[1] - 1].number);
      let a = currentNumber.numID;
      console.log(
        `I am changing the number ${newNumbers[nID[1] - 1].number} for ${
          currentNumber.number
        }`
      );
      console.log(
        `Iam changin the number ${
          newNumbers[currentNumber.numID.substring(1, 2) - 1].number
        } for ${n}`
      );

      newNumbers[currentNumber.numID.substring(1, 2) - 1].number = n;
      newNumbers[nID[1] - 1].number = currentNumber.number;
      console.log(currentNumber.numID[1]);

      setNumbers(newNumbers);
      setCurrentNumber({ number: null, numID: null });
    }
  };

  //This changes the currentOperator being selected, it will open the operator selector.
  const handleClickOperator = (opID) => {
    let subcenter = document.querySelector(".sub-center");
    if (currentOperator === "") {
      document.querySelector(`#${opID}`).className += " active";
      subcenter.animate(subcenterAppear, { duration: 300, iterations: 1 });
      setCurrentOperator(opID);
      subcenter.style.display = "block";
    } else if (currentOperator === opID) {
      document.querySelector(`#${currentOperator}`).className = "operator";
      subcenter.animate(subcenterDissapear, { duration: 300, iterations: 1 });
      setCurrentOperator("");
      setTimeout(() => {
        subcenter.style.display = "none";
      }, 290);
    } else {
      document.querySelector(`#${currentOperator}`).className = "operator";
      document.querySelector(`#${opID}`).className += " active";
      subcenter.animate(subcenterAppear, { duration: 300, iterations: 1 });
      setCurrentOperator(opID);
    }
  };

  //This is the central part of the game, 4 numbers and 3 operators.
  //This is an array of JSX Components, numbers and operators, functions and values are passed
  //to the children
  let operativeNumsAndOps = [];
  operativeNumsAndOps = [];
  for (let i = 0; i < 4; i++) {
    operativeNumsAndOps.push(
      <>
        <GameNumber
          id={numbers[i].numID}
          handleNumberChange={handleNumberChange}
          num={numbers[i].number}
        />

        {i !== 3 && (
          <Operator
            key={operators[i].opID}
            id={operators[i].opID}
            handleClickOperator={handleClickOperator}
            op={operators[i].op}
            currentOP={operators[i].op}
          />
        )}
      </>
    );
  }

  // Display the game
  return (
    <>
      <div className="cover"></div>
      <div className="center">
        <h1>4 to 10 (#{level})</h1>
        <div className="answer">
          <p>{answer}</p>
        </div>
        {operativeNumsAndOps}
      </div>
      <div className="sub-center">
        {operatorList.map((operator) => {
          return (
            <Operator
              holdBtn={holdBtn}
              children={operator}
              id={operator}
            ></Operator>
          );
        })}
      </div>
      <div className="levelContainer">
        {levels.map((lvl, idx) => {
          return (
            <LevelButton i={idx + 1} changeLevel={changeLevel} level={level} />
          );
        })}
      </div>
    </>
  );
};

export default Game;
