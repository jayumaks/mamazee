import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalState } from '../../../GlobalState';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;

const initialState = {
  email: '',
  password: '',
};

function Login() {
  const state = useContext(GlobalState);
  const [user, setUser] = useState(initialState);

  const { email, password } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // The section that handles the submit
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(endpoint + '/user/login', {
        email,
        password,
      });
      setUser({ ...user });

      localStorage.setItem('firstLogin', true);
      localStorage.setItem('token', res.data.access_token);
      toast.success(res.data.msg);

      setTimeout(() => {
        window.location.href = '/';
      }, 3500);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  // The section of the google login
  const responseGoogle = async (response) => {
    try {
      const res = await axios.post(endpoint + '/user/google_login', {
        tokenId: response.tokenId,
      });

      setUser({ ...user });

      localStorage.setItem('firstLogin', true);
      toast.success(res.data.msg);

      setTimeout(() => {
        window.location.href = '/';
      }, 3500);
    } catch (err) {
      setUser({ ...user });
      toast.error(err.response.data.msg);
    }
  };

  // The section of the facebook login
  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const { accessToken, userID } = response;
      const res = await axios.post(endpoint + '/user/facebook_login', {
        accessToken,
        userID,
      });

      setUser({ ...user });

      localStorage.setItem('firstLogin', true);
      toast.success(res.data.msg);

      setTimeout(() => {
        window.location.href = '/';
      }, 3500);
    } catch (err) {
      setUser({ ...user });
      console.log(err.response.data.msg);
    }
  };

  return (
    <div className='login'>
      <SEO title='Login' />
      <ToastContainer className='toaster' />
      <div className='login-page'>
        <form onSubmit={loginSubmit}>
          <h2>Login</h2>
          <div className='login-box'>
            <div>
              <h5>User login details</h5>
              <p>Email: jayumaks@gmail.com</p>
              <p>Password : jayumaks007</p>
            </div>
            <hr />
          </div>
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

          <div className='row'>
            <button type='submit'>Login</button>
            <Link to='/forgot_password'>Forgot your password?</Link>
          </div>
        </form>

        <div className='hr'>Or login with</div>

        <div className='social'>
          <GoogleLogin
            clientId='732418635424-vtiaoe7prh3lho8hp3kdh11gi7sl8e7l.apps.googleusercontent.com'
            buttonText='Continue with Google'
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className='button'
          />
        </div>
        <div className='socials'>
          <FacebookLogin
            appId='295778988595689'
            autoLoad={false}
            fields='name, email, picture'
            callback={responseFacebook}
            icon='fa-facebook'
            cssClass='buttons'
          />
        </div>

        <p>
          New Customer?
          <Link to='/register'> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
