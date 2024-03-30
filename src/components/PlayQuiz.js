import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import QuizResult from "./QuizResult";
import StartQuizSVG from "./assets/startQuiz.svg";


function PlayQuiz(props) {
  const [quizList, setQuizList] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [chosenCatagoryIndex, setChosenCatagoryIndex] = useState(-1);
  const [playQuiz, setPlayQuiz] = useState(false);
  const [quizArray, setQuizArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState([]);
  const [result, setResult] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  // const [ansArr,setAnsArr]=useState([]);

  const handlequizList = () => {
  let quizArr=(JSON.parse(localStorage.getItem("question")));
  quizArr=quizArr?.filter(quiz=>quiz.activate==true);
  setQuizList(quizArr)
    
  };

  const handlePlayerName = (e) => {
    e.preventDefault();

    let err = false;
    if (playerName.length < 5 || playerName.length > 20) {
      setError("Player name should be in 5 to 20 characters!");
      err = true;
    }
    if (!err) {
      setError(false);
      setPlayQuiz(true);
      props.setPlayerName(playerName)
    }
  };
  const handleChosenCatagoryIndex = (i) => {
    setChosenCatagoryIndex(i);
    setQuizArray(quizList[i].quizList);
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (currentIndex == quizList[chosenCatagoryIndex].quizList.length - 1) {
      console.log("end");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const handlePrev = (e) => {
    e.preventDefault();
    if (currentIndex == 0) {
      console.log("start");
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  const handleScore = (ans, index) => {
    const updatedScore = [...score];
    updatedScore[index] = ans;
    setScore(updatedScore);
  };
  const handleSubmit = () => {
    console.log(score)
    let res = 0;
    for (let i = 0; i < score.length; i++) {
      if (quizArray[i].correct == score[i]) {
        res += 5;
      }
      setResult(res);
      setShowResult(true);
    }
  };

  useEffect(() => {
    handlequizList();
  }, []);

  return (
    <div>
      {showResult ? (
        <QuizResult
          result={result}
          questionLen={quizArray.length}
          playerName={props.playerName}
          setPlayerName={props.setPlayerName}
          setShowResult={setShowResult}
        />
      ) : (
        <div>
          {" "}
          {/* <h2>Wellcome to QuizPlatform</h2> */}
          {!playQuiz ? (
            chosenCatagoryIndex == -1 ? (
              <div className="catagoryDiv">
                {quizList?.length>0?<><h3 className="text-muted text-center">Available Catagories</h3>
                <h6 className="text-secondary text-center ">
                  Choose any one catagory to play
                </h6>
                <div>
                  {quizList.map((item, index) => {
                    return (
                        <div
                          className="m-5 d-flex justify-content-center"
                          key={item.title}
                        >
                          <div
                            className="catagoryListCard d-flex justify-content-center align-items-center "
                            onClick={() => handleChosenCatagoryIndex(index)}
                          >
                            {" "}
                            <h4 className="text-muted text-center">{item.title}</h4>
                          </div>
                        </div>
                      
                    );
                  })
                }
                </div>
                </>:<h2 className="text-center text-danger">No catagory to show</h2>}
              </div>
            ) : (
              <div className=" enterNameCard">
                 <h3 className="text-muted text-center ">
                    {" "}
                    {/* <FaQuestionCircle className="m-0" />  */}
                    Selected Catagory:{" "}
                    {quizList[chosenCatagoryIndex].title}
                  </h3>
                  <p className="text-center">{quizList[chosenCatagoryIndex].description}</p>
                <div className="nameContainer">
                <div className="startQuizImage">
                  <img src={StartQuizSVG} alt="startquiz"/>
                </div>
                <div  className="nameForm">
                  <Form>
                    <Form.Label> <h6>Enter your Name to start the quiz:</h6></Form.Label>
                    <Form.Control
                      type="text"
                      value={playerName}
                      onChange={(event) => setPlayerName(event.target.value)}
                      placeholder="Enter full name"
                    />
                    <div>
                      {error && <h6 className=" mt-2 text-danger d-flex flex-wrap">{error}</h6>}
                      <div className="startQuizButtonDiv ">
                        {" "}
                        <button
                          className="qButton "
                          onClick={handlePlayerName}
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                   
                  </Form>
                </div>
                </div>
              </div>
            )
          ) : (
            <div className="container">
             
              <div className="quizCard shadow">
                <div className="d-flex justify-content-between m-0 mb-3 text-muted">
                  <h6>{quizList[chosenCatagoryIndex].title}</h6>
                  <h6>
                    {currentIndex + 1} / {quizArray.length}
                  </h6>
                </div>

                <h5>{quizArray[currentIndex].question}</h5>
                {quizArray[currentIndex].options.map((option,index)=>
               
                  <div
                  className={`optionDiv ${
                    score[currentIndex] === index+1 ? "ansDiv" : ""
                  }`}
                >
                  <h6 onClick={() => handleScore(index+1, currentIndex)}>
                    {option}
                  </h6>
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4 mx-2">
                  <button
                    className="qButton"
                    onClick={handlePrev}
                    disabled={currentIndex == 0}
                  >
                    Prev
                  </button>
                  {currentIndex == quizArray.length - 1 ? (
                    <button className="qButton" onClick={handleSubmit} disabled={score[currentIndex]===undefined}>
                      Submit
                    </button>
                  ) : (
                    <>
                    <button className="qButton" onClick={handleNext} disabled={score[currentIndex]===undefined}>
                      Next
                    </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PlayQuiz;
