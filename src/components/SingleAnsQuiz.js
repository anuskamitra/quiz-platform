import React  from 'react'

import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";



function SingleAnsQuiz(props) {

  const handleChange=(e)=>{
    const {name,value}=e.target;
    const list=[...props.quizList]
    list[props.questionNum-1][name]=value;
    props.setQuizList(list)
   }
  

  return (
        <Form className=" w-75 mx-5">
            {/* <Form.Group className="mb-3">
              <FloatingLabel label="Add a Description"> 
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Add a Description"
              />
              </FloatingLabel>
            </Form.Group> */}
          {/* </div> */}
          <br/>
          
          <h6 className="d-flex justify-content-end text-danger">Question {props.questionNum}</h6>

          <div className="rounded shadow pt-4 mt-3 quizCard">
          <Form.Group>
            <FloatingLabel label="Add a Question"  className="mx-5">
            <Form.Control type="text" name="question" value={props.quizList[props.questionNum-1].question} placeholder="Type a question..." onChange={(e)=>handleChange(e)}
            />
            </FloatingLabel>
          </Form.Group>
          <FormGroup> 
            <Row className="g-2">
              <Col md className="m-5 mt-4 mb-0">
                <div className="d-flex align-items-center">
                  <div className="m-3">
                    <input
                      type="radio"
                      id="optn1"
                      name="correct"
                     value={props.quizList?.[props.questionNum-1]["optn1"]}
                      onChange={(e)=>handleChange(e)}
                      checked={props.quizList?.[props.questionNum-1].correct===props.quizList[props.questionNum-1].optn1}
                    />
                  </div>
                  <FloatingLabel label="Option 1">
                    <Form.Control type="text" value={props.quizList[props.questionNum-1].optn1} onChange={(e)=>handleChange(e)} name="optn1"/>
                  </FloatingLabel>
                </div>
              </Col>

              <Col md className="m-5 mt-4 mb-0 ">
                <div className="d-flex align-items-center">
                  <div className="m-3">
                    <input
                      type="radio"
                      id="optn2"
                      name="correct"
                      checked={props.quizList?.[props.questionNum-1].correct===props.quizList[props.questionNum-1].optn2}
                     value={props.quizList?.[props.questionNum-1]["optn2"]}
                      onChange={(e)=>handleChange(e)}
                   
                      
                    />
                  </div>
                  <FloatingLabel label="Option 2">
                    <Form.Control  type="text" id="optn2" name="optn2" value={props.quizList[props.questionNum-1].optn2} onChange={(e)=>handleChange(e)}/>
                  </FloatingLabel>
                </div>
              </Col>
            </Row>
            <Row className="g-2">
              <Col md className="m-5 mt-4">
                <div className="d-flex align-items-center">
                  <div className="m-3">
                    <input
                      type="radio"
                      id="optn3"
                      name="correct"
                       checked={props.quizList?.[props.questionNum-1].correct===props.quizList[props.questionNum-1].optn3}
                     value={props.quizList?.[props.questionNum-1]["optn3"]}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <FloatingLabel label=" Option 3">
                    <Form.Control type="text" value={props.quizList[props.questionNum-1].optn3} onChange={(e)=>handleChange(e)} name="optn3" />
                  </FloatingLabel>
                </div>
              </Col>
              <Col md className="m-5 mt-4">
                <div className="d-flex align-items-center">
                  <div className="m-3">
                    <input
                      type="radio"
                      id="optn4"
                      name="correct"
                     checked={props.quizList?.[props.questionNum-1].correct===props.quizList[props.questionNum-1].optn4}
                      onChange={(e)=>handleChange(e)}
                    />
                  </div>
                  <FloatingLabel label="Option 4">
                    <Form.Control type="text"  value={props.quizList[props.questionNum-1].optn4} onChange={(e)=>handleChange(e)} name="optn4" />
                  </FloatingLabel>
                </div>
              </Col>
            </Row>
          </FormGroup>
          </div>
          {/* <button className='btn btn-primary'>Save</button> */}
         
        </Form>
        // </div>
    // </div>
  )
}

export default SingleAnsQuiz