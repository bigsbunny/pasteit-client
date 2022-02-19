import logo from './logo.svg';
import './App.css';
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from './components/HomePage';
import PastePage from './components/PastePage';
import PasteCollection from './components/PasteCollection';
import PasteViews from './components/PasteViews';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/:pasteId" element={<PastePage />} />
          <Route path="/pastes" element={<PasteCollection />} />
          <Route path="/views/:pasteId" element={<PasteViews />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
