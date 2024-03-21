import React, { useState, useEffect } from "react";
import ModalQuiz from "./ModalQuiz";
import SingleAnsQuiz from "./SingleAnsQuiz";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ViewQuestions from "./ViewQuestions";

function CreateQuizPage() {
  const [modalShow, setModalShow] = useState(true);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizList, setQuizList] = useState([
    {question: "", optn1: "", optn2: "", optn3: "", optn4: "", correct: "" }]);
  const [empty, setEmpty] = useState(false);
  const [singleAnsMcq, setSingleAnsMcq] = useState(true);
  const [storeArr, setStoreArr] = useState([]);
  const [qstnStored, setQstnStored] = useState(false);
  const [showQstn, setShowQstn]=useState(false);

  const handleSingleAnsQuiz = () => {
    setModalShow(false);
    setSingleAnsMcq(true);
  };
const handleHide=()=>{
  setModalShow(false); 
  setQstnStored(false);
}
  const handlequizList = () => {
    // if(quizList[quizList.length-1][0].details){
    //   setEmpty(false);
    // }
    // else{
    //   console.log("loded"+quizList[quizList.length-1])
    // }
    
    setQuizList([
      ...quizList,
      {question: "", optn1: "", optn2: "", optn3: "", optn4: "" },
    ]);
  };
  const handleStore = (e) => {
  e.preventDefault();
   console.log(quizList)
   let quiz={
    title:quizTitle,
    quizList:quizList
   }
   console.log(quiz)
  let storedData= JSON.parse(localStorage.getItem("question"));
  if(!Array.isArray(storedData)){
    storedData = [];
  }
    storedData.push(quiz)
    localStorage.setItem('question', JSON.stringify(storedData));
   
  }
  const handleShowAll=()=>{
    console.log(quizList)
    setShowQstn(true);
     // let a=JSON.parse(localStorage.getItem("question"))
  }
    // useEffect(() => {
    //   setQuizList(prevState => prevState.map(item => ({ ...item, title: quizTitle })));
    // }, [quizTitle]);
  return (
    <div>
      {showQstn ? <ViewQuestions questions={quizList} setShowQstn={setShowQstn}/>:
     
      <div>{singleAnsMcq && (
        <div className="d-flex flex-column align-items-center p-3 shadow-lg rounded singleQuizContainer">
          <Form className=" w-75 mx-5">
            <h2 className="m-3">Create new Quiz</h2>
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
            disabled={empty}
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
           {qstnStored &&
           <ModalQuiz
           show={qstnStored}
           questionStored="true"
           onHide={handleHide}
           sigleAnsQuiz={handleSingleAnsQuiz}
           title="Question submitted successfully!"
           showAll={handleShowAll}
         />
           }
          
         
        </div>
          
      )}
       </div> }  
          
          
    </div>
  );
}

export default CreateQuizPage;
