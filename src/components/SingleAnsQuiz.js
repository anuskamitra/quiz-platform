// SingleAnsQuiz component is used to show the questions in a card design
// each time user clicks add button one new component is added.

import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { brown, green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function SingleAnsQuiz(props) {
  const [optionButtonDisabled, setOptionButtonDisabled] = useState(false);

  // handleOptionChange is used when user chooses an correct option by radio button
  // from two or more options.
  const handleOptionChange = (e) => {
    props.setFillAllOption(false);
    let tempErr = [...props.error];
    tempErr[props.questionNum - 1] = {};
    props.setError(tempErr);
    const { name, value } = e.target;
    const list = [...props.quizList];
    list[props.questionNum - 1].options[name - 1] = value;
    props.setQuizList(list);
  };

// handleChange is called when user writes a question and its options
  const handleChange = (e) => {
    props.setFillAllOption(false);
    let tempErr = [...props.error];
    tempErr[props.questionNum - 1] = {};
    props.setError(tempErr);
    const { name, value } = e.target;

    const list = [...props.quizList];
    list[props.questionNum - 1][name] = value;
    props.setQuizList(list);
  };

  // To add more options to a question handleAddMoreOption is called.
  const handleAddMoreOption = () => {
    props.setFillAllOption(false);
    const list = [...props.quizList];
    for (let i = 0; i < list[props.questionNum - 1].options.length; i++) {
      if (list[props.questionNum - 1].options[i].length == 0) {
        props.setFillAllOption(true);
        return;
      }
    }
    if (list[props.questionNum - 1].options.length == 3) {
      setOptionButtonDisabled(true);
    }
    list[props.questionNum - 1].options.push("");
    props.setQuizList(list);
  };

  // To delete any option from a question handleDeleteOption is called.
  const handleDeleteOption = (index) => {
    const list = [...props.quizList];
    let tempErr = [...props.error];
    tempErr[props.questionNum - 1] = {};
    props.setError(tempErr);
    list[props.questionNum - 1].options.splice(index, 1);
    props.setQuizList(list);
    setOptionButtonDisabled(false);
  };

 // To delete a question from a quiz form handleAddMoreOption is called.
  const handleDeleteQuestion = (index) => {
    const list = [...props.quizList];
    list.splice(index, 1);
    props.setQuizList(list);
  };

  return (
    <Form className="">
      <br />
      <div className="d-flex justify-content-end">
        <h6 className="p-1"> Question {props.questionNum} </h6>
        <div className="ms-2">
          {" "}
          <DeleteIcon
            sx={{ color: brown[300] }}
            className="deleteButton"
            onClick={() => handleDeleteQuestion(props.questionNum - 1)}
          />
        </div>
      </div>
      <Form.Group>
        <FloatingLabel label="Add a Question">
          <Form.Control
            type="text"
            name="question"
            className={`${
              props.error?.[props.questionNum - 1]?.questionError
                ? "inputControlError"
                : ""
            }`}
            value={props.quizList[props.questionNum - 1].question}
            placeholder="Type a question..."
            onChange={(e) => handleChange(e)}
          />
          {props.error?.[props.questionNum - 1]?.questionError ? (
            <h6 className="text-danger ms-1 ">
              {props.error?.[props.questionNum - 1].questionError}
            </h6>
          ) : (
            ""
          )}
        </FloatingLabel>
      </Form.Group>
      <div className="optionContainer">
        {props.quizList[props.questionNum - 1].options.map((option, index) => (
          <div className="optionRow" key={index}>
            <FormGroup>
              <div className="d-flex justify-content-between mx-1">
                <div>
                  <input
                    type="radio"
                    id={index + 1}
                    name="correct"
                    value={index + 1}
                    onChange={(e) => handleChange(e)}
                    checked={
                      props.quizList?.[props.questionNum - 1].correct ==
                      index + 1
                    }
                  />
                  <label>
                    <h6 className="m-1"> Option {index + 1} </h6>{" "}
                  </label>
                </div>
                <div className="deleteButton">
                  <DeleteIcon
                    fontSize="sm"
                    onClick={() => handleDeleteOption(index)}
                  />
                </div>
              </div>
              <Form.Control
                size="lg"
                type="text"
                value={option}
                className={`${
                  props.error?.[props.questionNum - 1]?.fillAllOption &&
                  option.length == 0
                    ? "inputControlError"
                    : ""
                }`}
                onChange={(e) => handleOptionChange(e)}
                name={index + 1}
              />
              {props.error?.[props.questionNum - 1]?.fillAllOption &&
              option.length == 0 ? (
                <h6 className="text-danger text-center">
                  {props.error?.[props.questionNum - 1].fillAllOption}
                </h6>
              ) : (
                ""
              )}
            </FormGroup>
          </div>
        ))}
      </div>
      {props.error?.[props.questionNum - 1]?.fillCorrect ? (
        <h6 className="text-danger text-center">
          {props.error?.[props.questionNum - 1].fillCorrect}
        </h6>
      ) : (
        ""
      )}
      {props.error?.[props.questionNum - 1]?.mustFill ? (
        <h6 className="text-danger text-center">
          {props.error?.[props.questionNum - 1].mustFill}
        </h6>
      ) : (
        ""
      )}

      <button
        className="btn btn-light ms-3 "
        type="button"
        onClick={() => handleAddMoreOption()}
        disabled={optionButtonDisabled}
      >
        {" "}
        Add <AddCircleIcon sx={{ color: green[300] }} />{" "}
      </button>
      {props.fillAllOption ? (
        <h6 className="text-danger ms-3"> First fill the above options!</h6>
      ) : (
        ""
      )}
    </Form>
  );
}

export default SingleAnsQuiz;
