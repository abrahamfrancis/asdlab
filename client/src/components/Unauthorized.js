import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='container'>
        <h1>403 - You Shall Not Pass</h1>
      <p><Link to='/'>Back to Home</Link></p>
    </div>
  )
}

export default Unauthorized;