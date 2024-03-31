// MyQuiz component will show a table of quizlist user made, the table will have quiztitle,ative/deactive button,
//creation time of the quiz and action buttons like delete update and view.

import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ModalQuiz from "./ModalQuiz";
import ViewQuestions from "./ViewQuestions";
import CreateQuizPage from "./CreateQuizPage";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";

function MyQuiz() {
  const [quizList, setQuizList] = useState([]);
  const [indexToBeDeleted, setIndexToBeDeleted] = useState(-1);
  const [showQuestionList, setShowQuestionList] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [questionToView, setQuestionToView] = useState([]);
  const [showEditPage, setShowEditPage] = useState(false);
  const [showEditIndex, setShowEditIndex] = useState(-1);
  const [editQuiz, setEditQuiz] = useState("");
  const [activate, setActivate] = useState(true);
  const navigate = useNavigate();

  // buttons array will be sent to the ModalQuiz component to show buttons in the modal.
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

  // handleQuizList will store the quiz from the localstorage to quizList.
  const handlequizList = () => {
    setQuizList(JSON.parse(localStorage.getItem("question")));
  };

// handleDelete will delete any quiz which user has made, i.e the quiz will be deleted from localstorage
  const handleDelete = () => {
    quizList.splice(indexToBeDeleted, 1);
    localStorage.setItem("question", JSON.stringify(quizList));
    setConfirmModal(false);
  };

  // HandleShowQuestion will take the index of the quiz user want to show so that that quiz's question can be shown.
  const handleShowQustion = (index) => {
    setShowQuestionList(true);
    setQuestionToView(quizList[index]);
   
  };

  // handleEditQuiz will open the form with all the questions for a particular quiz in a editable way.
  const handleEditQuiz = (quiz, index) => {
    setEditQuiz(quiz);
    setShowEditPage(true);
    setShowEditIndex(index);
  
  };

  // handleActivation is used to update the status of any quiz from active to deactive and vice-versa,
  const handleActivation = (index) => {
    setActivate(!activate);
    quizList[index].activate = !quizList[index].activate;
    localStorage.setItem("question", JSON.stringify(quizList));
  };

  useEffect(() => {
    handlequizList();
  }, [showEditPage, activate]);
  return (
    <div className=" myQuizContainer">
      {showEditPage ? (
        <CreateQuizPage
          quiz={editQuiz}
          setShowEditPage={setShowEditPage}
          showEditPage={showEditPage}
          showEditIndex={showEditIndex}
        />
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
              title={`Are you sure want to delete ${quizList[indexToBeDeleted].title}?`}
              onHide={() => setConfirmModal(false)}
            />
          )}

          {quizList?.length > 0 ? (
            <>
              <div className=" myQuizHeader">
                <h2>My Quizes</h2>
                <button
                  className="qButton"
                  onClick={() => navigate("/createquiz")}
                >
                  Create New Quiz
                </button>
              </div>
              <div className="myQuizTableContainer ">
                <Table className="myQuizTable border">
                  <thead>
                    <tr>
                      <th>Sl.No.</th>
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
                        <td>
                          <h6
                            className="pointer"
                            onClick={() => handleShowQustion(index)}
                          >
                            {quizItem.title}
                          </h6>
                        </td>
                        <td className=" form-switch  ps-5">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            onChange={() => handleActivation(index)}
                            checked={quizItem.activate}
                          />
                        </td>

                        <td>{quizItem.createdAt}</td>
                        <td>
                          {" "}
                          <button
                            className="btn"
                            onClick={() => handleEditQuiz(quizItem, index)}
                          >
                            <BorderColorIcon fontSize="sm" color="action" />
                          </button>
                          <button
                            className="btn"
                            onClick={() => {
                              setConfirmModal(true);
                              setIndexToBeDeleted(index);
                            }}
                          >
                            {" "}
                            <DeleteIcon fontSize="sm" color="action" />
                          </button>
                          <button
                            className="btn"
                            onClick={() => handleShowQustion(index)}
                          >
                            <VisibilityIcon fontSize="sm" color="action" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          ) : (
            <h3 className="text-center p-2 text-danger">
              No Quiz is created yet!
            </h3>
          )}
        </>
      )}
    </div>
  );
}

export default MyQuiz;
