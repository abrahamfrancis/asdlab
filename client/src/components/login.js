import React from 'react';
import { Link } from 'react-router-dom';
import "./login.css"

const Login = (props) => {
  return (
    <div className="login-screen">
      <h1>Login</h1>
      <p><Link to='/admin'>View Admin Dashboard</Link></p>
      <p><Link to='/manager'>View Manager Dashboard</Link></p>
      <p>Logged in status: {props.user}</p>
      <button onClick={props.handleLogin}>Log In</button>
    </div>
  )
};

export default Login;