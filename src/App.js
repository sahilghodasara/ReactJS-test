import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from 'react-bootstrap/Navbar'

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand className="header">Manage Employees</Navbar.Brand>
      </Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
export default App;