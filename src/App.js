import "./App.css";
import NavbarQuiz from "./components/NavbarQuiz";
import Home from "./components/Home";
import CreateQuizPage from "./components/CreateQuizPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
   
    <div className="App">
       <Router>
      <NavbarQuiz />
     
        <Routes>
          <Route path='/' element={ <Home />}>
           
          </Route>
          <Route path='/createquiz' element={<CreateQuizPage />}>
          </Route>
        </Routes>
     
     
      </Router>
    </div>
  );
}

export default App;
