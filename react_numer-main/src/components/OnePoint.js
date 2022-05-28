import React, { useState, useEffect, useRef } from "react";
import "./bisection.css";
import { CallOnePoint } from "./OnePoint-table";

const OnePoint = () => {
  const [isLoaded, setIsLoaded] = useState([]);

  const [result, setresult] = useState("");

  const equationInputRef = useRef();
  const xmInputRef = useRef();

  const sendRequest = async () => {
    const response = await fetch("http://localhost:5000/api/get-onePoint" , {
      headers : {
        authorization : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZ29AaG90bWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY1Mzc1MTU3NCwiZXhwIjoxNjg1Mjg3NTc0fQ.x5cseNGmi6bINXoBhjvTK5iXLsuYqQuCbVikSnoyLsY`
      }
    });
    const responseData = await response.json();
    setIsLoaded(responseData);
  };
  useEffect(() => {
    sendRequest();
  }, []);

  const saveItem = (event) => {
    event.preventDefault();
    const enteredEquation = equationInputRef.current.value;
    const enteredXM = xmInputRef.current.value;

    let xmfloat = parseFloat(enteredXM);

    setresult(CallOnePoint(enteredEquation, xmfloat));
  };

  return (
    <div className="h1pj">
      <h1>คำนวณ OnePoint</h1>
      <div className="inputarea">
        <form onSubmit={saveItem}>
          <div>
            <label>input EQ</label>
          </div>

          <select ref={equationInputRef}>
            {isLoaded.map((equ, index) => {
              return (
                <option
                  key={index}
                  value={equ.equation}
                  label={equ.equation}
                ></option>
              );
            })}
          </select>

          <div>
            <label>input X0</label>
          </div>

          <select ref={xmInputRef}>
            {isLoaded.map((equXM, index) => {
              return (
                <option key={index} value={equXM.xm} label={equXM.xm}></option>
              );
            })}
          </select>

          <div>
            <input type="submit" className="btn-submit" value="Submit" />
          </div>
        </form>
      </div>
      <div>{result[0]}</div>
      <div>{result[1]}</div>
    </div>
  );
};

export default OnePoint;