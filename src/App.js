import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import React from 'react';
import { useState,useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
function App() {
 

  const [alert, setAlert] = useState(null);
  const [flag,setFlag]=useState(true);
  
  useEffect(() => {
    if(localStorage.getItem('token'))
    setFlag(false);
}, [])

const showAlert=(message,type)=>{
  setAlert({
    msg:message,
    type:type
  })
setTimeout(() => {
  setAlert(null)
}, 1500);
}

  return (
   
    <NoteState>
    <Router>
  <Navbar flag={flag} setFlag={setFlag} showAlert={showAlert}/>
  <Alert alert={alert}/>
  <div className="container">
  <Switch>
  <Route exact path="/">
    <Home showAlert={showAlert}/>
  </Route>
  <Route exact path="/about">
    <About />
  </Route>
  <Route exact path="/login">
    <Login showAlert={showAlert} setFlag={setFlag}/>
  </Route>
  <Route exact path="/signup">
    <Signup showAlert={showAlert}/>
  </Route>
</Switch>
</div>
</Router>
</NoteState>
  )
}
export default App;
