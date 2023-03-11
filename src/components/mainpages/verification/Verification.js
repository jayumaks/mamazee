import React from 'react';

import './verification.css';

import verify from './verify.png';

const Verification = () => {
  return (
    <div className='verification'>
      <Particle />
      <div className='verified-center'>
        <div className='verify-image'>
          <img src={verify} alt='verify-image' />
        </div>

        <div className='verify-div'>
          <h2>Confirm Your Email Address</h2>
          <p>We sent a confirmation mail to you</p>
          <p>
            Check your email and click on the confirmation button to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;
