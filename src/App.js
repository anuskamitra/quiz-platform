import "./App.css";
import NavbarQuiz from "./components/NavbarQuiz";
import Home from "./components/Home";
import CreateQuizPage from "./components/CreateQuizPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyQuiz from "./components/MyQuiz";
import PlayQuiz from "./components/PlayQuiz";

function App() {
  return ( 
    <div className="App">
       <Router>
      <NavbarQuiz />
        <Routes>
          <Route path='/' exact element={ <Home /> }> 
          </Route>
          <Route path='/myquiz' exact element={ <MyQuiz/> }> 
          </Route>
          <Route path='/createquiz' element={<CreateQuizPage />}>
          </Route>
          <Route path='/play' element={<PlayQuiz />}>
          </Route>
        </Routes>
     
     
      </Router>
    </div>
  );
}

export default App;
