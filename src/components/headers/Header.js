import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import { TiShoppingCart } from 'react-icons/ti';
import {
  FaShoppingBag,
  FaPowerOff,
  FaHistory,
  FaBoxes,
  FaStoreAlt,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { CgMenuLeft } from 'react-icons/cg';
import { GiCancel } from 'react-icons/gi';
import { IoMdLogIn } from 'react-icons/io';
import { Link } from 'react-router-dom';

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [loading] = state.userAPI.loading;
  const [menu, setMenu] = useState(false);

  // The section of the logout user
  const logoutUser = async () => {
    localStorage.clear();

    window.location.href = '/';
  };

  // The section of the admin router
  const adminRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <FaStoreAlt className='nav-icon' />
          <Link to='/create_product'>Create Product</Link>
        </li>

        <li onClick={() => setMenu(!menu)}>
          <FaUsers className='nav-icon' />
          <Link to='/users'>Users</Link>
        </li>

        <li onClick={() => setMenu(!menu)}>
          <FaBoxes className='nav-icon' />
          <Link to='/category'>Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li onClick={() => setMenu(!menu)}>
          <FaHistory className='nav-icon' />
          <Link to='/history'>History</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <FaUser className='nav-icon' />
          <Link to='/profile'>Profile</Link>
        </li>
        <li onClick={() => setMenu(!menu)}>
          <FaPowerOff className='nav-icon' />
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : '-100%',
  };

  return (
    <header>
      <div className='menu' onClick={() => setMenu(!menu)}>
        <CgMenuLeft />
      </div>

      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin ? 'Admin' : 'ush stitches'}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li onClick={() => setMenu(!menu)}>
          <FaShoppingBag className='nav-icon' />
          <Link to='/'>{isAdmin ? 'Products' : 'Products'}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged && loggedRouter()}

        {!isLogged && !loading && (
          <li onClick={() => setMenu(!menu)}>
            <IoMdLogIn className='nav-icon' />
            <Link to='/login'>Login</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <GiCancel className='menu' />
        </li>
      </ul>

      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <TiShoppingCart />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
