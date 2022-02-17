import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from './components/HomePage';
import PastePage from './components/PastePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/:pasteId" element={<PastePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
