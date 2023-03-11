import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification';

import verify from './download.jpeg';
import not from './not.jpeg';

import './activationEmail.css';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(endpoint + '/user/activation', {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  const activate = () => {
    return (
      <>
        <SEO title='Activate Email' />
        <div className='activation-image'>
          <img src={verify} alt='active-image' />
        </div>

        <div className='active-div'>
          <h2>VERIFIED</h2>
          <p>{success && showSuccessMsg(success)}</p>
          <small>you can now login</small>
        </div>
      </>
    );
  };

  const nonactivate = () => {
    return (
      <>
        <div className='activation-image'>
          <img src={not} alt='active-image' />
        </div>

        <div className='active-div'>
          <h2>UNVERIFIED</h2>
          <p>{err && showErrMsg('Verification Expired')}</p>
        </div>
      </>
    );
  };

  return (
    <div className='activation'>
      <div className='activation-center'>
        {success ? activate() : ''}
        {err ? nonactivate() : ''}
      </div>
    </div>
  );
};

export default ActivationEmail;
