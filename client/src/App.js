import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tickets from './pages/Tickets';
import Profile from './pages/Profile';
import ViewTickets from './pages/ViewTickets';
import ViewUsers from './pages/ViewUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<Home/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/register" element={<Register/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path ="/projects" element={<Projects/>}/>
        <Route path ="/tickets" element={<Tickets/>}/>
        <Route path ="/profile" element={<Profile/>}/>
        <Route path ="/viewtickets" element={<ViewTickets/>}/>
        <Route path ="/viewusers" element={<ViewUsers/>}/>
      </Routes>
    </Router>
  );
}

export default App;
