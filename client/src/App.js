import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Login from './components/login';
import Admin from './components/admin';
import ProtectedRoute from './components/protectedRoutes';
import Unauthorized from './components/Unauthorized';
import './App.css';

function App() {
  const [user, setUser] = useState(false);

  const handleLogin = e => {
    e.preventDefault();
    setUser(true);
  }

  const handleLogout = e => {
    e.preventDefault();
    setUser(false);
  }

  return (
    <div className="App">
    <Router>
      <Route exact path='/' handleLogin={handleLogin} render={props=> <Login {...props} user={user.toString()} handleLogin={handleLogin}/> } />
      <Route exact path='/admin' user={user} handleLogout={handleLogout} component={Admin} />
      <Route exact path='/unauthorized' component={Unauthorized} />
    </Router>
  </div>
  );
}

export default App;
