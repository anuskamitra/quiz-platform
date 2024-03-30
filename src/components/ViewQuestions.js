import React from 'react'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

function ViewQuestions(props) {

    const navigate=useNavigate();
    const closeCard=()=>{
      props.setShowQstn?.(false)
        props.setShowEditPage?.(false)
        navigate("/myquiz");   
    }

  return (
    <>
    <div className="qstnContainer" onClick={closeCard}></div>

    <div className="body your-div shadow p-4 rounded">
     
      <h3 className='pb-4 text-secondary text-decoration-underline text-center text-uppercase' >{props.title}</h3>
      <h3 className='pointer cross'><CloseIcon fontSize='large' onClick={closeCard}/></h3>
     
        {props.questions?.map((item,index)=>
        <div key={index} className='bg-light shadow rounded m-3 p-1'>   
      <h5 className='d-flex justify-content-start ms-4 mt-3'>{index+1}. {item.question}</h5>
      <div className='d-flex   justify-content-around viewQuestionList'>
      {item.options.map((option,index)=>
      <h6><li className={`${item.correct == index+1 ? 'text-success fw-bold' : ''}`}>{option}</li></h6> 
      )}
      </div>

        </div>
        
        )}

    </div>
    </>
  )
}

export default ViewQuestions