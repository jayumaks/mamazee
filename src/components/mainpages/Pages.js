import React, { useContext } from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import Products from './products/Products';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/NotFound';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
import ActivationEmail from './auth/ActivationEmail';

import { GlobalState } from '../../GlobalState';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Profile from './profile/Profile';
import Users from './profile/Users';

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/detail/:id' exact component={DetailProduct} />

      <Route path='/login' exact component={Login} />
      <Route path='/register' exact component={Register} />

      <Route path='/forgot_password' exact component={ForgotPassword} />
      <Route path='/user/reset/:token' exact component={ResetPassword} />

      <Route path='/profile' exact component={Profile} />

      <Route path='/users' exact component={Users} />

      <Route path='/category' exact component={Categories} />
      <Route path='/create_product' exact component={CreateProduct} />
      <Route path='/edit_product/:id' exact component={CreateProduct} />

      <Route path='/history' exact component={OrderHistory} />
      <Route path='/history/:id' exact component={OrderDetails} />

      <Route
        path='/user/activate/:activation_token'
        exact
        component={ActivationEmail}
      />

      <Route path='/cart' exact component={Cart} />

      <Route exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
