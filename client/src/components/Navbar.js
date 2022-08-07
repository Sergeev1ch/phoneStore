import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='navbario'>
        <div className='navbar-logo'>
            <span>MOBILE</span>
            <i className="bi bi-shop"></i>
            <span>STORE</span>
        </div>
        <div className='links'>
          <a onClick={() => { navigate('/'); }}>SHOP</a>
          <a onClick={() => { navigate('/cart'); }}>CART</a>
          <a onClick={() => { navigate('/addItem'); }}>ADD ITEM</a>
          <a onClick={() => { navigate('/ordersList'); }}>ORDERS</a>
        </div>
    </div>
  );
}
export default Navbar;