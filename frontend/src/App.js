import {BrowserRouter as Router} from "react-router-dom"
import MainContainer from "./containers/MainContainer";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <MainContainer/>
      </div>
    </Router>
  );
}

export default App;
