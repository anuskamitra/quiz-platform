import React, { useEffect, useState } from "react";
import {  MdDeleteForever } from "react-icons/md";
import { Table } from "react-bootstrap";
import { MdOutlineEdit } from "react-icons/md";
import ModalQuiz from "./ModalQuiz";
import { GrFormView } from "react-icons/gr";
import ViewQuestions from "./ViewQuestions";
import CreateQuizPage from "./CreateQuizPage";
import { useNavigate } from "react-router-dom";
import {Switch} from "antd"

function MyQuiz() {
  const [quizList, setQuizList] = useState([]);
  const [indexToBeDeleted, setIndexToBeDeleted] = useState(-1);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [questionToView, setQuestionToView] = useState([]);
  const [showEditPage, setShowEditPage] = useState(false);
  const [showEditIndex,setShowEditIndex]=useState(-1);
  const [editQuiz, setEditQuiz] = useState("");
  const [activate,setActivate]=useState(true);
  const navigate=useNavigate()
  
  const buttons = [
    {
      text: "Delete",
      onClick: () => handleDelete(),
      className: "bg-primary mx-1",
    },
    {
      text: "Close",
      onClick: () => setConfirmModal(false),
      className: "bg-secondary mx-1",
    },
  ];

  const handlequizList = () => {
    setQuizList(JSON.parse(localStorage.getItem("question")));
  };

  const handleDelete = () => {
    quizList.splice(indexToBeDeleted, 1);
    localStorage.setItem("question", JSON.stringify(quizList));
    setConfirmModal(false);
  };

  const handleShowQustion = (index) => {
    setShowQuestionList(true);
    setQuestionToView(quizList[index]);
    console.log(quizList[index]);
  };
  const handleEditQuiz = (quiz, index) => {
    setEditQuiz(quiz);
    setShowEditPage(true);
    setShowEditIndex(index)
    console.log(index)
  };
  const handleAnctivation=(index)=>{
    setActivate(!activate)
    console.log(index);
    console.log(quizList[index])
    quizList[index].activate= !quizList[index].activate;
    localStorage.setItem('question', JSON.stringify(quizList));

  }
  useEffect(() => {
    handlequizList();
},[showEditPage,activate]);
  return (
    <div className=" w-75 m-auto">
      {showEditPage ? (
        <CreateQuizPage quiz={editQuiz} setShowEditPage={setShowEditPage} showEditPage={showEditPage} showEditIndex={showEditIndex}/>
      ) : (
        <>
          {showQuestionList && (
            <ViewQuestions
              questions={questionToView.quizList}
              title={questionToView.title}
              setShowQstn={setShowQuestionList}
            />
          )}
          {confirmModal && (
            <ModalQuiz
              show={confirmModal}
              buttons={buttons}
              title="Are you sure want to delete?"
              onHide={() => setConfirmModal(false)}
            />
          )}
          <div className=" my-5 d-flex justify-content-between">
            <h2>My Quizes</h2>
            <button className="qButton" onClick={()=>navigate("/createquiz")}>Create New Quiz</button>
          </div>
          <Table className="my-5 shadow border text-center">
            <thead className="">
              <tr className="border">
                <th>Quiz No.</th>
                <th>Title</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizList.map((quizItem, index) => (
                <tr className="m-2" key={index}>
                  <td className="bold">{index + 1}</td>
                  <td>{quizItem.title}</td>
                  <td>
                    {" "}
                    <Switch onClick={()=>handleAnctivation(index)} defaultChecked={quizItem.activate} />
                  </td>
                  <td>{quizItem.createdAt}</td>
                  <td>
                    {" "}
                    <button
                      className="btn"
                      onClick={() => handleEditQuiz(quizItem,index)}
                    >
                      <MdOutlineEdit className="text-primary" />
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        setConfirmModal(true);
                        setIndexToBeDeleted(index);
                      }}
                    >
                      {" "}
                      <MdDeleteForever className="text-danger " />
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleShowQustion(index)}
                    >
                      <GrFormView size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default MyQuiz;
