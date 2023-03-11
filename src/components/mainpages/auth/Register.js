import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from '../utils/validation/Validation';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
};

function Register() {
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // The section of the register submit
  const registerSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({ ...user }, toast.error('Please fill in all fields'));

    if (!isEmail(email))
      return setUser({ ...user }, toast.error('Invalid email'));

    if (isLength(password))
      return setUser(
        { ...user },
        toast.error('password must be at least 6 characters')
      );

    if (!isMatch(password, cf_password))
      return setUser({ ...user }, toast.error('password did not match'));

    try {
      const res = await axios.post(endpoint + '/user/register', {
        name,
        email,
        password,
      });

      setUser({ ...user }, toast.success(res.data.msg));

      setTimeout(() => {
        window.location.href = '/login';
      }, 3500);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className='login'>
      <SEO title='Register' />
      <ToastContainer className='toaster' />
      <div className='login-page'>
        <form onSubmit={registerSubmit}>
          <h2>Register</h2>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={onChangeInput}
          />

          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={onChangeInput}
          />

          <input
            type='password'
            name='password'
            autoComplete='on'
            placeholder='Password'
            value={password}
            onChange={onChangeInput}
          />

          <input
            type='password'
            name='cf_password'
            autoComplete='on'
            placeholder='Confirm password'
            value={cf_password}
            onChange={onChangeInput}
          />

          <div className='row'>
            <button type='submit'>Register</button>
          </div>
          <p>
            Already a member? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
