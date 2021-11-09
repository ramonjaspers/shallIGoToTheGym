import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/Navigation.css';

export default function Navigation() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className='row navigation'>
      <ul id='naviagtionItems'>
        <li className='appLogo'>
          <NavLink to='/home'>SIGTTG</NavLink>
        </li>
        <li className='navigationUrl'>
          <NavLink to='/goals'>GOAL<br />ADVICE</NavLink>
        </li>
        <li className='navigationUrl'>
          <NavLink to='/tdee'>TDEE<br />CALCULATOR</NavLink>
        </li>
        <li className='navigationUrl'>
          <NavLink to='/exercises'>EXERCISE<br />FINDER</NavLink>
        </li>
        {user ?
          <li className='navigationUrl'>
            <div id='dropdown'>
              <button id='dropdownButton'><a>{user.username}</a></button>
              <div className='dropdownContent'>
                <NavLink className='dropdownItem' to='/profile'>Profile</NavLink>
                <NavLink className='dropdownItem' to='/login'>Login</NavLink>
              </div>
            </div>
          </li>
          :
          <li className='navigationUrl'>
            <NavLink to='/login'>Login</NavLink>
          </li>
        }
      </ul>
    </div>
  );
}