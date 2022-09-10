import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tickets from './pages/Tickets';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Login/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path ="/projects" element={<Projects/>}/>
        <Route path ="/tickets" element={<Tickets/>}/>
        <Route path ="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
