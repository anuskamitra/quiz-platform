// ModalQuiz component is used to show any component trough out the project.
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalQuiz(props) {
  return (
    <div>
      <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title
            className="text-muted"
            id="contained-modal-title-vcenter"
          >
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.buttons.map((button, index) => (
            <Button
              className={`${button.className} m-1`}
              key={index}
              onClick={button.onClick}
            >
              {button.text}
            </Button>
          ))}
        </Modal.Body>
      </Modal>
      <div></div>
    </div>
  );
}

export default ModalQuiz;
