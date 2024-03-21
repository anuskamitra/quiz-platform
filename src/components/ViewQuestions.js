import React from 'react'
import { useNavigate } from 'react-router-dom'

function ViewQuestions(props) {
    const navigate=useNavigate();
    const closeCard=()=>{
        props.setShowQstn(false)
        navigate("/myquiz");
    }

  return (
    <>
    <div className="qstnContainer" onClick={closeCard}></div>
    <div className="body your-div bg-light shadow p-4">
      <h3 className='pb-2 text-secondary text-decoration-underline' >{props.title}</h3>
        {props.questions?.map((item,index)=>
        <div key={index}>
          
      <h5 className='d-flex justify-content-start ms-4'>{index+1}. {item.question}</h5>
      <div className='d-flex m-3 justify-content-center justify-content-around'>
      <h6>  <li className={`${item.correct === item.optn1 ? 'text-success' : ''}`}>{item.optn1}</li></h6>
      <h6><li className={`${item.correct === item.optn2 ? 'text-success' : ''}`}>{item.optn2}</li></h6>
      <h6><li className={`${item.correct === item.optn3 ? 'text-success' : ''}`}>{item.optn3}</li></h6>
      <h6>  <li className={`${item.correct === item.optn4 ? 'text-success' : ''}`}>{item.optn4}</li></h6>
        </div>
        <hr className='text-danger mx-4'/>
        </div>
        
        )}

    </div>
    </>
  )
}

export default ViewQuestions