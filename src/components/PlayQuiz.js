import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

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

  const handlequizList = () => {
    setQuizList(JSON.parse(localStorage.getItem("question")));
  };

  const handlePlayerName = (e) => {
    e.preventDefault();
    console.log(playerName);
    setPlayQuiz(true);
    console.log(quizList);
    console.log(chosenCatagoryIndex);
    console.log(quizArray)

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
      <h2>Wellcome to QuizPlatform</h2>
      {!playQuiz ? (
        chosenCatagoryIndex == -1 ? (
          <>
            <h3>Available Catagories</h3>
            {quizList.map((item, index) => (
              <h6
                key={item.title}
                onClick={() => handleChosenCatagoryIndex(index)}
              >
                {item.title}
              </h6>
            ))}
          </>
        ) : (
          <Form className="shadow">
            <h3>{quizList[chosenCatagoryIndex].title}</h3>
            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
            />
            <button className="btn btn-primary" onClick={handlePlayerName}>
              Start Quiz
            </button>
          </Form>
        )
      ) : (
        <>
          <h5 >{quizArray[currentIndex].question}</h5>
         <h6 className=" "> <button className="btn btn-dark px-5" onClick={()=>handleScore(quizArray[currentIndex].optn1,currentIndex)}>{quizArray[currentIndex].optn1}</button></h6>
          <h6><button onClick={()=>handleScore(quizArray[currentIndex].optn2,currentIndex)}>{quizArray[currentIndex].optn2}</button></h6>
          <h6><button onClick={()=>handleScore(quizArray[currentIndex].optn3,currentIndex)}>{quizArray[currentIndex].optn3}</button></h6>
          <h6><button onClick={()=>handleScore(quizArray[currentIndex].optn4,currentIndex)}>{quizArray[currentIndex].optn4}</button></h6>
          <button onClick={handlePrev} disabled={currentIndex==0}>Prev</button>
          {currentIndex==quizArray.length-1?<button onClick={handleSubmit}>Submit</button>:<button onClick={handleNext}>Next</button>}
        </>
      )}
    </div>
  );
}

export default PlayQuiz;
