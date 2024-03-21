import React from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate=useNavigate();

    function handleCreateQuiz(){
        navigate("/createquiz")
    }
    function handleMyQuiz(){
        navigate("/myquiz")
    }
    function handlePlayQuiz(){
      navigate("/play")
    }
  return (
    <div className='d-flex justify-content-center mt-4'>
    <Card title="Create New Quiz" onClick={handleCreateQuiz} className="card1"/>
    <Card title="My Quiz"  onClick={handleMyQuiz}  className="card2"/>
    <Card title="Play Quiz" onClick={handlePlayQuiz} className="card3"/>
    </div>
  )
}

export default Home