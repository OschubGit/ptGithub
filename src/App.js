import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Layout />} />
          <Route
            path="/repository/:slug"
            element={
              <Layout>
                <Content />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
