import { useState, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

const endpoint = process.env.REACT_APP_API;

function UserAPI() {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  //

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          setLoading(true);
          const res = await axios.get(endpoint + '/user/infor', {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
          setData(res.data);
          setLoading(false);
        } catch (err) {
          console.log(err.response.data.msg);
          setLoading(false);
        }
      };

      getUser();
    }
  }, [token]);

  // The section of the add to cart
  const addCart = async (product) => {
    if (!isLogged) return alert('Please login to continue buying');

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        endpoint + '/user/addcart',
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
    } else {
      alert('This product has been added to cart.');
    }
  };

  return {
    user: [data, setData],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    loading: [loading, setLoading],
  };
}

export default UserAPI;
