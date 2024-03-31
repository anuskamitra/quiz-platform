//Home component is the first component which will be shown.
import React from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom'
import StartQuizSVG from "./assets/startQuiz.svg";
import QuizListSVG from "./assets/quizList.svg"
import PlayQuiz from "./assets/playQuiz.svg"

function Home() {
  //useNavigate is used to navigate form page to page
    const navigate=useNavigate();

    //handleCreateQuiz function will navigate user to createquiz page.
    function handleCreateQuiz(){
        navigate("/createquiz")
    }
    //handleMyQuiz function will navigate to myquiz page.
    function handleMyQuiz(){
        navigate("/myquiz")
    }
    //hanglePlageQuiz function will nagivate to play page
    function handlePlayQuiz(){
      navigate("/play")
    }
  return (
    <div className="home">
    <Card title="Create New Quiz" onClick={handleCreateQuiz} className="card1" src={StartQuizSVG}/>
    <Card title="My Quiz List"  onClick={handleMyQuiz}  className="card2" src={QuizListSVG}/>
    <Card title="Play Quiz" onClick={handlePlayQuiz} className="card3" src={PlayQuiz}/>
    </div>
  )
}

export default Home