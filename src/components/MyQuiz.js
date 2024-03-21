import React, { useEffect,useState } from 'react';
import { Md18Mp, Md4Mp, MdDeleteForever } from "react-icons/md";
import { Table } from 'react-bootstrap';
import { MdOutlineEdit } from "react-icons/md";
import ModalQuiz from './ModalQuiz';
import { GrFormView } from "react-icons/gr";
import ViewQuestions from './ViewQuestions';



function MyQuiz() {
    const[quizList,setQuizList]=useState([]);
    const[indexToBeDeleted,setIndexToBeDeleted]=useState(-1);
    const[showQuestionList,setShowQuestionList]=useState(false);
    const [confirmModal,setConfirmModal]=useState(false);
    const [questionToView,setQuestionToView]=useState([]);
    // const[showQstn,setShowQstn]=useState(false)

    const buttons=[
        {text:"Delete",onClick:() => handleDelete(), className:"bg-primary mx-1"},
        {text:"Close", onClick:() => setConfirmModal(false),className:"bg-secondary mx-1"}
    ]


    const handlequizList=()=>{
        setQuizList(JSON.parse(localStorage.getItem("question")))
    }

    const handleDelete=()=>{
        console.log(quizList[indexToBeDeleted])
        console.log(indexToBeDeleted);
        quizList.splice(indexToBeDeleted,1);
        localStorage.setItem('question', JSON.stringify(quizList));
        setConfirmModal(false);
    }

    const handleShowQustion=(index)=>{
        setShowQuestionList(true);
        setQuestionToView(quizList[index]);
        console.log(quizList[index])
    }
    
    useEffect(()=>{
        handlequizList();
    },[])
  return (
    <div className=' w-75 m-auto'>
        {showQuestionList && <ViewQuestions questions={questionToView.quizList} title={questionToView.title} setShowQstn={setShowQuestionList}/>}
        {confirmModal && <ModalQuiz show={confirmModal} buttons={buttons} title="Are you sure want to delete?" onHide={()=>setConfirmModal(false)} />}
   <div className=' my-5 d-flex justify-content-between'>
        <h2>My Quizes</h2>
       <button className='btn btn-primary px-3'>Create New Quiz</button></div>
        <Table className='my-5 shadow border'>
            <thead className=''>
        <tr className='border '>
            <th >Quiz No.</th>  
            <th>Title</th> 
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
        </tr>
        </thead>
       <tbody>
        {quizList.map((quizItem,index)=>
                <tr className='m-2' key={index}>
                <td className='bold'>{index+1}</td>
               <td>{quizItem.title}</td>
               <td> <button type="button" className="btn btn-outline-secondary">Deactive</button></td>
               <td>10-2-2024</td>
               <td> <button className='btn'><MdOutlineEdit className='text-primary'/></button><button className='btn' onClick={()=>{setConfirmModal(true);setIndexToBeDeleted(index)}}> <MdDeleteForever className='text-danger '/></button> <button className='btn' onClick={()=>handleShowQustion(index)}><GrFormView size={20} /></button></td>
               </tr>

        )}
        </tbody>
        
         </Table>
    </div>
  )
}

export default MyQuiz