import React, { useState, useContext } from 'react';
import axios from 'axios';
import { isLength, isMatch } from '../utils/validation/Validation';
import { FaCamera } from 'react-icons/fa';
import { GlobalState } from '../../../GlobalState';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './profile.css';

import spin from '../images/spin.gif';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;
const token = localStorage.getItem('token');

const initialState = {
  name: '',
  password: '',
  cf_password: '',
};

const Profile = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [user] = state.userAPI.user;

  const [data, setData] = useState(initialState);
  const { name, password, cf_password } = data;

  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);

  // The handleChange section
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // The change Avatar section
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({ ...data }, toast.error('No files were uploaded'));

      if (file.size > 1024 * 1024)
        return setData({ ...data }, toast.error('Size too large'));

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return setData({ ...data }, toast.error('File format not supported'));

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post(endpoint + '/api/upload_avatar', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data }, toast.error(err.response.data.msg));
    }
  };

  // The update information section
  const updateInfor = () => {
    try {
      axios.patch(
        endpoint + '/user/update',
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: { Authorization: token },
        }
      );
      setData({ ...data }, toast.success('Updated successfully!'));
    } catch (err) {
      setData({ ...data }, toast.error(err.response.data.msg));
    }
  };

  // The section updating the password
  const updatePassword = () => {
    if (isLength(password))
      return setData(
        { ...data },
        toast.error('Password must be at least 6 characters long')
      );

    if (!isMatch(password, cf_password))
      return setData({ ...data }, toast.error('password did not match'));

    try {
      axios.put(
        endpoint + '/user/reset',
        { password },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data }, toast.success('Updated'));
    } catch (err) {
      setData({ ...data }, toast.error(err.response.data.msg));
    }
  };

  // The handleUpdate section
  const handleUpdate = () => {
    if (name || avatar) updateInfor();
    if (password) updatePassword();
  };

  return (
    <div className='profile'>
      <SEO title='Profile' />
      <div className='profile-column'>
        <ToastContainer className='toaster' />
        <h2>{isAdmin ? 'Admin Profile' : 'User Profile'}</h2>

        <div className='avatar'>
          {loading && (
            <div className='loading'>
              <img src={spin} alt='loading' />
            </div>
          )}

          <img src={avatar ? avatar : user.avatar} alt='avatar' />
          <span>
            <FaCamera className='camera' />
            {/* <p>Change</p> */}
            <input
              type='file'
              name='file'
              id='file_up'
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div classame='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            id='name'
            defaultValue={user.name}
            placeholder='your name'
            onChange={handleChange}
          />
        </div>

        <div classame='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            defaultValue={user.email}
            placeholder='your email address'
            disabled
          />
        </div>

        <div classame='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            placeholder='your password'
            onChange={handleChange}
          />
        </div>

        <div classame='form-group'>
          <label htmlFor='cf_password'>Confirm New Password</label>
          <input
            type='password'
            name='cf_password'
            id='cf_password'
            value={cf_password}
            placeholder='Confirm password'
            onChange={handleChange}
          />
        </div>

        <div className='em'>
          <em style={{ color: 'crimson' }}>
            * If you update your password here, you will not be able to login
            quickly using google and facebook.
          </em>
        </div>

        <button disabled={loading} onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Profile;
