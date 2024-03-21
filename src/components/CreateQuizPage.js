import React, { useState, useEffect } from "react";
import ModalQuiz from "./ModalQuiz";
import SingleAnsQuiz from "./SingleAnsQuiz";
import { Button } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ViewQuestions from "./ViewQuestions";

function CreateQuizPage(props) {
  const [modalShow, setModalShow] = useState(true);
  const [quizTitle, setQuizTitle] = useState("");
  const [singleAnsMcq, setSingleAnsMcq] = useState(true);
  const [qstnStored, setQstnStored] = useState(false);
  const [showQstn, setShowQstn] = useState(false);
  const [activate,setActivate]=useState(true);
  const [quizList, setQuizList] = useState([
    { question: "", optn1: "", optn2: "", optn3: "", optn4: "", correct: "" },
  ]);

  const buttons=[
    {text:"Show All",onClick:() => handleShowAll(), className:"bg-primary mx-1"},
    {text:"Close", onClick:() =>handleHide(),className:"bg-secondary mx-1"}
  ]
  const monthArr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // const handleSingleAnsQuiz = () => {
  //   setModalShow(false);
  //   setSingleAnsMcq(true);
  // };
  const handleHide = () => {
    setModalShow(false);
    setQstnStored(false);
    props.setShowEditPage(false)
  };
  const handlequizList = () => {
    setQuizList([
      ...quizList,
      { question: "", optn1: "", optn2: "", optn3: "", optn4: "" },
    ]);
  };
  const handleStore = (e) => {
    e.preventDefault();
    let time=new Date();
    let day=time.getDay();
    let format="AM"
    let month=time.getMonth();
    let hour=time.getHours();
    let min=time.getMinutes();
    if(hour>12){
      hour=hour-12;
      format="PM";
    } 
   const createdAt=day+" "+monthArr[month]+", "+hour+":"+min+" "+format
    console.log(createdAt)
  
    let quiz = {
      activate:activate,
      createdAt:createdAt,
      title: quizTitle,
      quizList: quizList,
    };
  
    let storedData = JSON.parse(localStorage.getItem("question"));
    if (!Array.isArray(storedData)) {
      storedData = [];
    }
    storedData.push(quiz);
    localStorage.setItem("question", JSON.stringify(storedData));
    setQstnStored(true);
  };

  const handleShowAll = () => {
    setShowQstn(true);
  };

  useEffect(() => {
   
    if(props?.quiz){
      setQuizList(props.quiz.quizList);
      setQuizTitle(props.quiz.title)
    }
  },[]);
  return (
    <div>
      {showQstn ? (
        <ViewQuestions questions={quizList} setShowQstn={setShowQstn} title={quizTitle} setShowEditPage={props.setShowEditPage}/>
      ) : (
        <>
     
        <div>
          {singleAnsMcq && (
            <div className="d-flex flex-column align-items-center p-3 shadow-lg rounded singleQuizContainer">
              <Form className=" w-75 mx-5">
                <h2 className="m-3">Create or Update Quiz</h2>
                <div className="border p-2">
                  <Form.Group className="">
                    <FloatingLabel label="Quiz Title">
                      <Form.Control
                        type="text"
                        placeholder="Add a Title..."
                        value={quizTitle}
                        onChange={(event) => setQuizTitle(event.target.value)}
                      />
                    </FloatingLabel>
                  </Form.Group>
                </div>
              </Form>
              {quizList.map((item, index) => (
                <div key={index}>
                  <SingleAnsQuiz
                    questionNum={index + 1}
                    setQuizList={setQuizList}
                    quizList={quizList}
                  />
                </div>
              ))}
              <Button
                onClick={handlequizList}
                className=" shadow-lg border d-flex justify-content-start "
                variant="success"
              >
                Add
              </Button>
              <hr className="bg-dark text-danger" />
              <Button
                className="mt-4 d-flex "
                variant="primary"
                type="submit"
                onClick={handleStore}
              >
                Submit
              </Button>
              {qstnStored && (
                <ModalQuiz
                  show={qstnStored}
                  onHide={handleHide}
                  title="Question submitted successfully!"
                  showAll={handleShowAll}
                  buttons={buttons}
                />
              )}
            </div>
          )}
        </div>
        </>)}
    </div>
    
  );
}

export default CreateQuizPage;
