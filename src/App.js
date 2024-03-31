//In App.js react-router-dom is used to create three pages which are home,myQuiz and play 
import "./App.css";
import NavbarQuiz from "./components/NavbarQuiz";
import Home from "./components/Home";
import CreateQuizPage from "./components/CreateQuizPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyQuiz from "./components/MyQuiz";
import PlayQuiz from "./components/PlayQuiz";
import { useState } from "react";

function App() {
  //playerName will be used to show the player name in navigation bar.
  const[playerName,setPlayerName]=useState("");
  return ( 
    <div >
       <Router>
      <NavbarQuiz playerName={playerName}/>
        <Routes>
          <Route path='/' exact element={ <Home /> }> 
          </Route>
          <Route path='/myquiz' exact element={ <MyQuiz/> }> 
          </Route>
          <Route path='/createquiz' element={<CreateQuizPage />}>
          </Route>
          <Route path='/play' element={<PlayQuiz setPlayerName={setPlayerName} playerName={playerName}/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
