import Header from "./components/Header";
import {
  BrowserRouter as Router, Route,
  Routes,
} from "react-router-dom";
import Repository from "./components/Repository";
import Content from "./components/Content";


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" exact element={<Header/>}/>
              <Route path="/repository/:slug" element={<Content/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
