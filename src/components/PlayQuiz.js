import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { Card } from "react-bootstrap";
import Row from 'react-bootstrap/Row';

function PlayQuiz() {
  const [quizList, setQuizList] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [chosenCatagoryIndex, setChosenCatagoryIndex] = useState(-1);
  const [playQuiz, setPlayQuiz] = useState(false);
  const [quizArray,setQuizArray]=useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const[score,setScore]=useState([]);
  const [result,setResult]=useState(0);
  const [showResult,setShowResult]=useState(false);
  const [error,setError]=useState("");

  const handlequizList = () => {
    setQuizList(JSON.parse(localStorage.getItem("question")));
  };

  const handlePlayerName = (e) => {
    e.preventDefault();

    let err=false;
    if(playerName.length<5 || playerName.length>20){
      setError("Player name should be in 5 to 20 characters!");
      err=true;

    }
    if(!err){
      setError(false)
      setPlayQuiz(true);
    }
  };
  const handleChosenCatagoryIndex = (i) => {
    setChosenCatagoryIndex(i);
    setQuizArray(quizList[i].quizList);
  };
  const handleNext = (e) => {
    e.preventDefault();
    if(currentIndex==quizList[chosenCatagoryIndex].quizList.length-1){
        console.log("end")
    }
    else{
    setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePrev=(e)=>{
    e.preventDefault();
    if(currentIndex==0){
        console.log("start")
    }
    else{
    setCurrentIndex((prev) => prev - 1);
    }
  }
  const handleScore=(ans,index)=>{
    const updatedScore = [...score];
    if(quizArray[index].correct==ans){
        console.log("match"+index);
        updatedScore[index] = 1;
        setScore(updatedScore);
    }
    else{
        console.log("nomatch"+index);
        updatedScore[index] = 0;
        setScore(updatedScore);
    }
  }
  const handleSubmit=()=>{
    console.log(score)
  let  res=0;
  for(let i=0;i<score.length;i++){
    res+=score[i]*5;
    setResult(res);
    setShowResult(true);
  }
  console.log(res)
  }
  useEffect(() => {
    handlequizList();
  }, []);

  return (
    <div>
        {showResult && <h2>Congratulation! you got {result} out of {quizArray.length*5}</h2>}
      {/* <h2>Wellcome to QuizPlatform</h2> */}
      {!playQuiz ? (
        chosenCatagoryIndex == -1 ? (
          <div className="catagoryDiv">
            <h3 className="text-muted">Available Catagories</h3>
            <p className="text-muted">Choose one to play</p>
            <div >
            {quizList.map((item, index) => {return (
            item.activate===true &&  <div className="m-5 d-flex justify-content-center"
                key={item.title}   
              >
               <div className="shadow catagoryListCard d-flex justify-content-center align-items-center " onClick={() => handleChosenCatagoryIndex(index)} > <p>{item.title}</p></div> 
              </div>
           ) })}
           </div>
          </div>
        ) : (
          <div className="w-75 catagoryDiv d-flex flex-column">
             <h3 className="text-muted">Selected Catagory: {quizList[chosenCatagoryIndex].title}</h3>
             <p>Hello Wellcome to this quiz app, it will enhance your general knowledge on several topic</p>
          <Form className="w-50 m-auto">
            <Form.Label>Enter your Name:</Form.Label>
            <Form.Control
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
            <div>
              {error && <h6 className=" mt-2 text-danger">{error}</h6>}
              <button className="btn btn-primary my-2" onClick={handlePlayerName}>
              Start Quiz
            </button></div>
          </Form>
          </div>
        )
      ) : (
        <div className="quizCard">
          <div className="d-flex justify-content-between m-0 mb-3 text-muted">
          <h6>{quizList[chosenCatagoryIndex].title}</h6>
          <h6>{currentIndex+1} / {quizArray.length}</h6>
          </div>
        
          <h5 >{quizArray[currentIndex].question}</h5>
        <div className={`optionDiv {$}`}> <h6  onClick={()=>handleScore(quizArray[currentIndex].optn1,currentIndex)}>{quizArray[currentIndex].optn1}</h6></div>
        <div className="optionDiv"><h6 onClick={()=>handleScore(quizArray[currentIndex].optn2,currentIndex)}>{quizArray[currentIndex].optn2}</h6></div> 
        <div className="optionDiv" ><h6  onClick={()=>handleScore(quizArray[currentIndex].optn3,currentIndex)}>{quizArray[currentIndex].optn3}</h6></div>
         <div  className="optionDiv" ><h6 onClick={()=>handleScore(quizArray[currentIndex].optn4,currentIndex)}>{quizArray[currentIndex].optn4}</h6></div>
         <div className="d-flex justify-content-between mt-4 mx-2">
          <button className="qButton" onClick={handlePrev} disabled={currentIndex==0}>Prev</button>
          {currentIndex==quizArray.length-1?<button className="qButton" onClick={handleSubmit}>Submit</button>:<button className="qButton" onClick={handleNext}>Next</button>}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayQuiz;
