import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Navbar from "./components/navbar.component"
import BugList from "./components/bugs-list.component";
import EditBug from "./components/edit-bugs.component";
import CreateExercise from "./components/create-bug.component";
import CreateUser from "./components/create-user.component";
import CreateBug from './components/create-bug.component';

function App() {
  return (
    <Router> 
      <div className= "container">
      <Navbar />
      <br/>
        <Route path ="/" exact component = {BugList} />
        <Route path = "/edit/:id" component={EditBug} />
        <Route path = "/create" component={CreateBug} />
        <Route path = "/user" component={CreateUser} /> 
      </div>
    </Router>
  );
}

export default App;
