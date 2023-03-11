import React, { useContext } from 'react';
import { PaystackButton } from 'react-paystack';
import { GlobalState } from '../../../GlobalState';

function App({ tranSuccess, total, data }) {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const { name, email } = data;

  console.log('pay');

  // if (!isLogged) {
  //   alert('Please login to checkout your product');
  //   return;
  // }

  // you can call this function anything
  const handlePaystackSuccessAction = (payment) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log('The payment was succeeded!', payment);
    tranSuccess(payment);
  };

  // you can call this function anything
  const handlePaystackCloseAction = (data) => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('The payment was cancelled!', data);
    // console.log(name)
  };

  const config = {
    reference: new Date().getTime(),
    firstname: name,
    email: email,
    amount: total + '00',
    publicKey: 'pk_test_e42d2ab36c637c36e33bd62abd74a8055e2f0790',
    // metadata: {
    //   name,
    //   phone,
    // },
  };

  const componentProps = {
    ...config,
    text: 'PayNow',
    onSuccess: (payment) => handlePaystackSuccessAction(payment),
    onClose: handlePaystackCloseAction,
  };

  return <PaystackButton {...componentProps} className='pay-button' />;
}

export default App;
