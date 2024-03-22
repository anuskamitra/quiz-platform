import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import QuizResult from "./QuizResult";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import StartQuizSVG from "./startQuiz.svg";

function PlayQuiz() {
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
    setQuizList(JSON.parse(localStorage.getItem("question")));
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
          playerName={playerName}
        />
      ) : (
        <div>
          {" "}
          {/* <h2>Wellcome to QuizPlatform</h2> */}
          {!playQuiz ? (
            chosenCatagoryIndex == -1 ? (
              <div className="catagoryDiv">
                <h3 className="text-muted text-center">Available Catagories</h3>
                <h6 className="text-secondary text-center ">
                  Choose any one catagory to play
                </h6>
                <div>
                  {quizList.map((item, index) => {
                    return (
                      item.activate === true && (
                        <div
                          className="m-5 d-flex justify-content-center"
                          key={item.title}
                        >
                          <div
                            className="shadow catagoryListCard d-flex justify-content-center align-items-center "
                            onClick={() => handleChosenCatagoryIndex(index)}
                          >
                            {" "}
                            <h4 className="text-muted">{item.title}</h4>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="shadow enterNameCard d-flex justify-content-between">
                <div className="startQuizImage">
                  <h3 className="text-muted d-flex">
                    {" "}
                    <FaQuestionCircle className="me-2" /> Selected Catagory:{" "}
                    {quizList[chosenCatagoryIndex].title}
                  </h3>
                  <img src={StartQuizSVG} alt="startquiz"></img>
                </div>
                <div  className="d-flex align-items-center nameForm shadow">
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
                      <div className="">
                        {" "}
                        <button
                          className="qButton p-2 mt-4"
                          onClick={handlePlayerName}
                        >
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            )
          ) : (
            <div>
              <h4 className="d-flex justify-content-end me-3 mt-3 text-secondary">
                {playerName}
              </h4>
              <div className="quizCard shadow">
                <div className="d-flex justify-content-between m-0 mb-3 text-muted">
                  <h6>{quizList[chosenCatagoryIndex].title}</h6>
                  <h6>
                    {currentIndex + 1} / {quizArray.length}
                  </h6>
                </div>

                <h5>{quizArray[currentIndex].question}</h5>
                <div
                  className={`optionDiv ${
                    score[currentIndex] === "1" ? "ansDiv" : ""
                  }`}
                >
                  {" "}
                  <h6 onClick={() => handleScore("1", currentIndex)}>
                    {quizArray[currentIndex].optn1}
                  </h6>
                </div>
                <div
                  className={`optionDiv ${
                    score[currentIndex] === "2" ? "ansDiv" : ""
                  }`}
                >
                  <h6 onClick={() => handleScore("2", currentIndex)}>
                    {quizArray[currentIndex].optn2}
                  </h6>
                </div>
                <div
                  className={`optionDiv ${
                    score[currentIndex] === "3" ? "ansDiv" : ""
                  }`}
                >
                  <h6 onClick={() => handleScore("3", currentIndex)}>
                    {quizArray[currentIndex].optn3}
                  </h6>
                </div>
                <div
                  className={`optionDiv ${
                    score[currentIndex] === "4" ? "ansDiv" : ""
                  }`}
                >
                  <h6 onClick={() => handleScore("4", currentIndex)}>
                    {quizArray[currentIndex].optn4}
                  </h6>
                </div>
                <div className="d-flex justify-content-between mt-4 mx-2">
                  <button
                    className="qButton"
                    onClick={handlePrev}
                    disabled={currentIndex == 0}
                  >
                    Prev
                  </button>
                  {currentIndex == quizArray.length - 1 ? (
                    <button className="qButton" onClick={handleSubmit}>
                      Submit
                    </button>
                  ) : (
                    <button className="qButton" onClick={handleNext}>
                      Next
                    </button>
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
