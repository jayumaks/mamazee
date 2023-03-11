import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { isLength, isMatch } from '../utils/validation/Validation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;

const initialState = {
  password: '',
  cf_password: '',
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleResetPass = async () => {
    if (isLength(password))
      return setData(
        { ...data },
        toast.error('Password must be at least 6 characters.')
      );

    if (!isMatch(password, cf_password))
      return setData({ ...data }, toast.error('Password did not match'));

    try {
      const res = await axios.post(
        endpoint + '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data }, toast.success(res.data.msg));
      setTimeout(() => {
        window.location.href = '/login';
      }, 3500);
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data }, toast.error('password session expired'));
    }
  };

  return (
    <div className='forgot'>
      <SEO title='Reset Password' />
      <div className='fg_pass'>
        <ToastContainer className='toaster' />
        <h2>Reset Your Password</h2>

        <div className='row'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={handleChangeInput}
            placeholder='Enter your new Password'
          />

          <label htmlFor='cf_password'>Confirm Password</label>
          <input
            type='password'
            name='cf_password'
            id='cf_password'
            value={cf_password}
            onChange={handleChangeInput}
            placeholder='confirm password'
          />

          <button onClick={handleResetPass}>Reset Password</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
