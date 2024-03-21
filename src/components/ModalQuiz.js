import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function ModalQuiz(props) {
  const navigate=useNavigate()
useEffect(()=>{
  console.log("ModalQuiz")
})
  // return (
  //   <Modal
  //     {...props}
  //     size="md"
  //     aria-labelledby="contained-modal-title-vcenter"
  //     centered
  //   >
  //     <Modal.Header closeButton>
  //       <Modal.Title className="text-muted" id="contained-modal-title-vcenter">
  //         {props.title}
  //       </Modal.Title>
  //     </Modal.Header>
  //     {props.questionStored ? (
  //       <Modal.Body>
  //         <Button
  //           variant="outline-primary"
  //           className="btn me-3 ms-3 mt-1 mb-1"
  //            onClick={props.showAll}
  //         >
  //           View All
  //         </Button>
  //         <Button variant="outline-primary" className="btn me-3 ms-3 mt-1 mb-1" onClick={()=>navigate("/")}>
  //           Close
  //         </Button>
  //       </Modal.Body>
  //     ) : (
  //       <Modal.Body>
  //         <Button
  //           variant="outline-primary"
  //           className="btn me-3 ms-3 mt-1 mb-1"
  //           onClick={props.sigleAnsQuiz}
  //         >
  //           MCQ (single correct)
  //         </Button>
  //         <Button variant="outline-primary" className="btn me-3 ms-3 mt-1 mb-1">
  //           MCQ (multiple correct)
  //         </Button>
  //         <Button variant="outline-primary" className="btn me-3 ms-3 mt-2 mb-2">
  //           Short Answer (with 2 words)
  //         </Button>
  //         <Button
  //           variant="outline-primary"
  //           className="btn  ms-3 me-3 mt-2 mb-2"
  //         >
  //           Description (with 2 to 4 sentences) (single correct)
  //         </Button>
  //       </Modal.Body>
  //     )}
  //   </Modal>
  // );



  return(
    <div>
  <Modal
      {...props}
      // size="md"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-muted" id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.buttons.map((button, index) => (
          <Button className={button.className} key={index} onClick={button.onClick}>{button.text}</Button>
        ))} 
         </Modal.Body>
    </Modal>
  <div>
    <h2>Hello</h2>
  {console.log("hello")}
  </div>
  </div>
  )

}

export default ModalQuiz;
