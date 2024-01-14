import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import OffcanvasExample from './components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Dashboard from './components/dashboard';
import NoteState from './contexts/notes/NoteState';
import Login from './components/Login';
// import SlideToggler from './components/SlideToggler';

const App = () => {
  return (
    <div className="App">
      <NoteState>
        <Router>
        
          <OffcanvasExample />
         
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
};

export default App;
