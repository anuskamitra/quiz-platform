import React, { useEffect, useState } from 'react'
import CongoCSV from "./congo.svg"
import SorryCSV from "./sorry.svg"

function QuizResult(props) {
    const[pass,setPass]=useState(true);
 useEffect(()=>{
  if(Math.round((props.result/(props.questionLen*5))*100)<60){
        setPass(false);
  }
 },[])
  return (
    <div className='resultDiv'>
        <div className='csv '>
           {pass? <img src={CongoCSV} alt="congo"/>:<img src={SorryCSV} alt="sorry"/>}
        </div>
        <div className='pt-4'>
    <h2 className='text-center'>{pass?"Congratulation":"Sorry"} {props.playerName} </h2>
    <h2 className='text-center'> You got {props.result} out of {props.questionLen*5}!</h2>
   {pass? <h6 className='text-center text-secondary'>You passed the exam with {Math.round((props.result/(props.questionLen*5))*100)}%</h6>:
   <h6 className='text-center text-danger'>You failed, to pass you need minimum 60%.</h6>}
    </div>
    </div>
  )
}

export default QuizResult