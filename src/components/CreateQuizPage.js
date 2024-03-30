import React, { useState, useEffect } from "react";
import ModalQuiz from "./ModalQuiz";
import SingleAnsQuiz from "./SingleAnsQuiz";
import ViewQuestions from "./ViewQuestions";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


function CreateQuizPage(props) {
  const [fillAllOption, setFillAllOption] = useState(false);
  const [modalShow, setModalShow] = useState(true);
  const [quizHeader, setQuizHeader] = useState({title:"",description:""});
  const [singleAnsMcq, setSingleAnsMcq] = useState(true);
  const [qstnStored, setQstnStored] = useState(false);
  const [showQstn, setShowQstn] = useState(false);
  const [activate, setActivate] = useState(true);
  const [titleError, setTitleError] = useState("");
  const [error, setError] = useState([{}]);
  const [quizList, setQuizList] = useState([
    { question: "", options: ["", ""], correct: "" },
  ]);
const navigate=useNavigate()
  const buttons = [
    {
      text: "Show All",
      onClick: () => handleShowAll(),
      className: "bg-primary mx-1",
    },
    {
      text: "Close",
      onClick: () => handleHide(),
      className: "bg-secondary mx-1",
    },
  ];
  const quizTypeButton = [
    {
      text: "MCQ (Single Correct)",
      onClick: () => handleSingleAnsQuiz(),
    },
    {
      text: "MCQ (Multiple Correct)",
    },
    {
      text: "Short Answer(with 2 words)",
    },
    {
      text: "Description (with 2 or 4 sentences).",
    },
  ];
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleSingleAnsQuiz = () => {
    setModalShow(false);
    setSingleAnsMcq(true);
  };

  const handleHide = () => {
    setModalShow(false);
    setQstnStored(false);
    navigate("/")
   
  };
  const handlequizList = () => {
    let err = false;
    const list = [...quizList];

    let tempError = {};

    if (
      quizList?.[quizList.length - 1]?.question.length < 10 ||
      quizList?.[quizList.length - 1]?.question.length > 200
    ) {
      err = true;
      if (quizList?.[quizList.length - 1]?.question.length == 0) {
        tempError = {
          ...tempError,
          questionError: "Question cannot be empty string!",
        };
      } else {
        tempError = {
          ...tempError,
          questionError: "Question cannot be empty string!",
        };
      }
    }

    if (list?.[quizList.length - 1]?.options.length < 2) {
      err = true;
      tempError = {
        ...tempError,
        mustFill: "Atleast two options are must for MCQ",
      };
    } else {
      for (let i = 0; i < list?.[quizList.length - 1]?.options?.length; i++) {
        if (list?.[quizList.length - 1]?.options[i].length == 0) {
          err = true;
          tempError = {
            ...tempError,
            fillAllOption: "Options cannot be empty!",
          };
        }
      }
    }

    if (err === false && quizList?.[quizList.length - 1]?.correct == "") {
      err = true;
      tempError = {
        ...tempError,
        fillCorrect: "Must tick the correct option !",
      };
    }

    let tempErrorArr = [...error];
    tempErrorArr[quizList.length - 1] = tempError;
    setError(tempErrorArr);

    if (!err) {
      tempErrorArr = [...error, {}];
      setError(tempErrorArr);
      setQuizList([
        ...quizList,
        { question: "", options: ["", ""], correct: "" },
      ]);
    }
  };
  let err = false;

  const handleStore = (e) => {
    e.preventDefault();
    console.log(quizList);
    err = false;

    const list = [...quizList];

    if (quizHeader?.title?.length < 10 || quizHeader?.title?.length > 30) {
      err = true;
      setTitleError(
        "Title should be minimum of 10 characters and maximum of 30 characters"
      );
    }
    let tempErrorArr = [];
    for (let i = 0; i < quizList.length; i++) {
      let tempError = {};
      if (
        quizList[i].question.length < 10 ||
        quizList[i].question.length > 200
      ) {
        err = true;
        if (quizList?.[i]?.question.length == 0) {
          tempError = {
            ...tempError,
            questionError: "Question cannot be empty string!",
          };
        } else {
          tempError = {
            ...tempError,
            questionError:
              "Question length has to be between 10 to 300 characters.",
          };
        }
      }
      if (list?.[i]?.options.length < 2) {
        err = true;
        tempError = {
          ...tempError,
          mustFill: "Atleast two options are must for MCQ",
        };
      } else {
        for (let j = 0; j < list?.[i]?.options?.length; j++) {
          if (list?.[i]?.options[j]?.length == 0) {
            err = true;
            tempError = {
              ...tempError,
              fillAllOption: "Options cannot be empty!",
            };
          }
        }
      }
      if (err === false && quizList?.[i]?.correct === "") {
        err = true;
        tempError = {
          ...tempError,
          fillCorrect: "Must tick the correct option !",
        };
      }

      tempErrorArr[i] = tempError;
      setError(tempErrorArr);
    }
    if (!err) {
      let time = new Date();
      let day = time.getDay();
      let format = "AM";
      let month = time.getMonth();
      let hour = time.getHours();
      let min = time.getMinutes();
      if (hour > 12) {
        hour = hour - 12;
        format = "PM";
      }
      const createdAt =
        day + " " + monthArr[month] + ", " + hour + ":" + min + " " + format;
      console.log(createdAt);

      let quiz = {
        activate: activate,
        createdAt: createdAt,
        title: quizHeader.title,
        description:quizHeader.description,
        quizList: quizList,
      };
       console.log(quiz)
      let storedData = JSON.parse(localStorage.getItem("question"));
      if (!Array.isArray(storedData)) {
        storedData = [];
      }
      storedData.push(quiz);
      localStorage.setItem("question", JSON.stringify(storedData));
      setQstnStored(true);
      console.log(quizList);
    }
  };
  const handleUpdateStore = () => {
    console.log(quizList);
    err = false;

    const list = [...quizList];
    if (quizHeader.title.length < 10 || quizHeader.title.length > 30) {
      err = true;
      setTitleError(
        "Title should be minimum of 10 characters and maximum of 30 characters"
      );
    }

    let tempErrorArr = [];
    for (let i = 0; i < quizList.length; i++) {
      let tempError = {};
      if (
        quizList[i].question.length < 10 ||
        quizList[i].question.length > 200
      ) {
        err = true;
        if (quizList?.[i]?.question.length == 0) {
          tempError = {
            ...tempError,
            questionError: "Question cannot be empty string!",
          };
        } else {
          tempError = {
            ...tempError,
            questionError:
              "Question length has to be between 10 to 300 characters.",
          };
        }
      }
      if (list?.[i]?.options.length < 2) {
        err = true;
        tempError = {
          ...tempError,
          mustFill: "Atleast two option required to save question!",
        };
      } else {
        for (let j = 0; j < list?.[i]?.options?.length; j++) {
          if (list?.[i]?.options[j]?.length == 0) {
            err = true;
            tempError = {
              ...tempError,
              fillAllOption: "Options cannot be empty!",
            };
          }
        }
      }
      if (err === false && quizList?.[i]?.correct === "") {
        err = true;
        tempError = {
          ...tempError,
          fillCorrect: "Must tick the correct option !",
        };
      }

      tempErrorArr[i] = tempError;
      setError(tempErrorArr);
    }

    if (!err) {
      let storedData = JSON.parse(localStorage.getItem("question"));
      storedData[props.showEditIndex].quizList = quizList;
      console.log(storedData[props.showEditIndex])
      storedData[props.showEditIndex].title=quizHeader?.title
      storedData[props.showEditIndex].description=quizHeader.description
      localStorage.setItem("question", JSON.stringify(storedData));
      setQstnStored(true);
    }
  };
  const handleShowAll = () => {
    setShowQstn(true);
  };
  useEffect(() => {
    if (props?.quiz) {
      setQuizList(props.quiz.quizList);
      setQuizHeader(prev=>({title:props.quiz.title,description:props.quiz.description?props.quiz.description:""}));
      let temp=[...error]
      for(let i=1;i<props.quiz.quizList.length;i++){
            temp[i]={};
      }
      console.log(temp);
      setError(temp)
    }
  }, []);

  return (
    <div>
      {!props.showEditPage && <ModalQuiz
        buttons={quizTypeButton}
        show={modalShow}
        onHide={handleSingleAnsQuiz}
        title="Select Question Type"
        centered="centered"
      />}
      {showQstn ? (
        <ViewQuestions
          questions={quizList}
          setShowQstn={setShowQstn}
          title={quizHeader.title}
          setShowEditPage={props.setShowEditPage}
        />
      ) : (
        <>
          <div>
            {singleAnsMcq && (
              <div
                className={`d-flex flex-column  p-3 rounded singleQuizContainer ${
                  titleError ? "errorCard" : ""
                } `}
              >
                <Form>
                  <h2 className="m-3 text-center text-muted">
                    {!props.showEditPage
                      ? "Create your own Quiz"
                      : "Update your Quiz"}
                  </h2>
                  <div className="border p-2">
                    <Form.Group className="">
                      <FloatingLabel label="Quiz Title">
                        <Form.Control
                          type="text"
                          placeholder="Add a Title..."
                          value={quizHeader.title}
                          onChange={(event) => {
                            setQuizHeader(prev=>({...prev,title:event.target.value}));
                            setTitleError("");
                          }}
                          className={`${titleError ? "errorCard" : ""}`}
                        />
                      </FloatingLabel>
                      <FloatingLabel label="Description" className="mt-2">
                        <Form.Control
                          as="textarea"
                          style={{
                            height: '100px'
                          }}
                          value={quizHeader.description}
                          onChange={(event) => {
                            setQuizHeader(prev=>({...prev,description:event.target.value}));
                            setTitleError("");
                          }}
                           
                        />
                      </FloatingLabel>

                    
                      
                      {titleError ? (
                        <h6 className="text-danger m-1">{titleError}</h6>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                  </div>
                  
                  {quizList?.map((item, index) => (
                    
                    <div
                  
                      key={index}
                   
                      className={`rounded  mt-5 singleQuizCard 

                        ${
                        Object.keys(error[index])?.length !== 0
                          ? "errorCard"
                          : "shadow"
                      }
                      `}
                    >
                    
                      
                      <SingleAnsQuiz
                        questionNum={index + 1}
                        setQuizList={setQuizList}
                        quizList={quizList}
                        fillAllOption={fillAllOption}
                        setFillAllOption={setFillAllOption}
                        error={error}
                        setError={setError}
                      />
                      {/* {error[index]?.questionError?error[index]?.questionError:""} */}
                    </div>
                  ))}
                  {error.fillCorrect ? (
                    <h6 className="text-danger ms-5 ps-5">
                      {error.fillCorrect}
                    </h6>
                  ) : (
                    ""
                  )}
                  {error.fillAllOption ? (
                    <h6 className="text-danger ms-5 ps-5">
                      {error.fillAllOption}
                    </h6>
                  ) : (
                    ""
                  )}
                  {error.mustFill ? (
                    <h6 className="text-danger ms-5 ps-5">{error.mustFill}</h6>
                  ) : (
                    ""
                  )}
                  {error.questionError ? (
                    <h6 className="text-danger ms-5 ps-5">
                      {error.questionError}
                    </h6>
                  ) : (
                    ""
                  )}
                </Form>
                <div className="text-center">
                  {" "}
                  <button onClick={handlequizList} className="qButton mt-4">
                    Add
                  </button>
                </div>

                <div className="ms-auto ">
                  {props.showEditPage ? (
                    <button
                      className="mt-4 d-flex createQuizButton "
                      onClick={() => handleUpdateStore()}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="mt-4 d-flex createQuizButton"
                      type="submit"
                      onClick={handleStore}
                    >
                      Submit
                    </button>
                  )}
                </div>
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
        </>
      )}
    </div>
  );
}

export default CreateQuizPage;
