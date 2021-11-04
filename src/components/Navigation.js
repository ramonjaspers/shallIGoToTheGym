import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/Navigation.css';

export default function Navigation() {
  const { isAuth } = useContext(AuthContext);
  const [showMenu, toggleShowMenu] = useState(false);

  return (
    <div className='row navigation'>
      <ul id='naviagtionItems'>
        <li className='appLogo'>
          <NavLink to="/home">SIGTTG</NavLink>
        </li>
        <li className='navigationUrl'>
          <NavLink to="/goals">GOAL<br />ADVICE</NavLink>
        </li>
        <li className='navigationUrl'>
          <NavLink to="/tdee">TDEE<br />CALCULATOR</NavLink>
        </li>
        <li className='navigationUrl'>
          <NavLink to="/exercises">EXERCISE<br />FINDER</NavLink>
        </li>
        {isAuth ?
          <>
            <span onClick={toggleShowMenu(true)}>Account</span>
            {showMenu ? (
              <div
                style={{
                  width: "100px",
                  border: "1px solid #eee",
                  padding: "10px"
                }}
                ref={element => {
                  this.dropdownMenu = element;
                }}
              >
                <span><NavLink to="/profile">Profile</NavLink></span>
                <span><NavLink to="/logout">Logout</NavLink></span>
              </div>
            ) : null}
          </>
          :
          <li className='navigationUrl'>
            <NavLink to="/login">Login</NavLink>
          </li>
        }
      </ul>
    </div>
  );
}