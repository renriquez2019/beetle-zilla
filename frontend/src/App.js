import logo from './logo.svg';
import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom";

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<SignIn/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
