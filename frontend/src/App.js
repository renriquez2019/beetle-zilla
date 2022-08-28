import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom";

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<SignIn/>}/>
        <Route path ="/signin" element={<SignIn/>}/>
        <Route path ="/signup" element={<SignUp/>}/>
        <Route path ="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
