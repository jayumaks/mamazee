import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCheck, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { GlobalState } from '../../../GlobalState';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './users.css';
import SEO from '../../SEO/SEO';
import Loading from './../utils/Loading';
const endpoint = process.env.REACT_APP_API;
const token = localStorage.getItem('token');

//

const Users = () => {
  const [data, setData] = useState([]);
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [loading] = state.userAPI.loading;
  const [load, setLoad] = useState(false);
  const [callback, setCallback] = useState(false);

  useEffect(async () => {
    if (isAdmin) {
      try {
        setLoad(true);
        const res = await axios.get(endpoint + '/user/all_infor', {
          headers: {
            Authorization: token,
          },
        });
        setData(res.data);
        setLoad(false);
      } catch (err) {
        setData({ ...data });
        setLoad(false);
      }
    }
  }, [isAdmin, token, callback]);

  const handleDelete = (id) => {
    console.log(id);
    fetch(endpoint + `/user/delete/${id}`, {
      method: 'delete',
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((items) => {
          return items._id !== result._id;
        });
        setData(newData);
        setCallback(!callback);
      });
  };

  if (load || loading) return <Loading />;

  //

  return (
    <div className='users'>
      <SEO title='Users' />
      <div className='users-center'>
        <h2>Customers</h2>
        {loading && <div>loading...</div>}
        <div style={{ overflowX: 'auto' }}>
          <table className='customers'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => {
                const { _id, name, email } = item;
                return (
                  <>
                    <tr key={_id}>
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>
                        {item.role === 1 ? (
                          <FaCheck title='Admin' className='check' />
                        ) : (
                          <FaTimes title='User' className='times' />
                        )}
                      </td>
                      <td>
                        <FaTrashAlt
                          title='remove'
                          onClick={() => handleDelete(item._id)}
                          className='trash'
                        />
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
