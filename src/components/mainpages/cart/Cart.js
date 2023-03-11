import React, { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
// import PaypalButton from './PaypalButton'
import PaystackButton from './Paystack';
// import FlutterWaveButton from './Flutterwave'
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SEO from '../../SEO/SEO';
const endpoint = process.env.REACT_APP_API;
const token = localStorage.getItem('token');

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [user] = state.userAPI.user;
  const [isLogged] = state.userAPI.isLogged;
  const [total, setTotal] = useState(0);
  const data = user;

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      endpoint + '/user/addcart',
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm('Do you want to delete this product?')) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async () => {
    // const { reference } = payment;

    console.log('trans');

    // if (!isLogged) {
    //   alert('Please login to checkout your product');
    //   return;
    // }

    await axios.post(
      endpoint + '/api/payment',
      { cart },
      {
        headers: { Authorization: token },
      }
    );

    toast.success('You have successfully placed an order.');
    setTimeout(() => {
      setCart([]);
      addToCart([]);
    }, 3500);
  };

  if (cart.length === 0)
    return (
      <div className='empty'>
        <h2 style={{ textAlign: 'center', fontSize: '3rem' }}>Cart Empty</h2>
      </div>
    );

  return (
    <div>
      <SEO title='Cart' />
      <ToastContainer className='toaster' />
      {cart.map((product) => (
        <div className='carting' key={product._id}>
          <div className='detail cart' key={product._id}>
            <img src={product.images.url} alt='' />

            <div className='box-detail'>
              <h2>{product.title}</h2>

              <h3>₦ {product.price * product.quantity}</h3>
              <p>{product.description}</p>
              <p>{product.content}</p>

              <div className='amount'>
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>
              <FaTrash
                className=' delete'
                onClick={() => removeProduct(product._id)}
              />
            </div>
          </div>
        </div>
      ))}

      <div className='total'>
        <h3>Total: ₦ {total.toLocaleString()}</h3>
        <div className='check'>
          <h3>
            Checkout <FaCheckCircle />{' '}
          </h3>
          <PaystackButton total={total} tranSuccess={tranSuccess} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
