import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';
import '../assets/styles/Navigation.css';

/**
 * Renders the navigation bar
 * @returns {render}
 */
export default function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <div className='row navigation'>
      <ul id='naviagtion-items'>
        <li id='app-logo'>
          <NavLink to='/home'>SIGTTG</NavLink>
        </li>
        <li className='navigation-url'>
          <NavLink to='/goals'>GOAL<br />ADVICE</NavLink>
        </li>
        <li className='navigation-url'>
          <NavLink to='/tdee'>TDEE<br />CALCULATOR</NavLink>
        </li>
        <li className='navigation-url'>
          <NavLink to='/exercises'>EXERCISE<br />FINDER</NavLink>
        </li>
        {user ?
          <li className='navigation-url'>
            <div id='dropdown'>
              <p id='dropdown-button'>{user.username} 👤</p>
              <div id='dropdown-content'>
                <NavLink className='dropdownItem' to='/profile'>Profile 💪</NavLink>
                <NavLink className='dropdownItem' to='/logout'>Logout 🚪</NavLink>
              </div>
            </div>
          </li>
          :
          <li className='navigation-url'>
            <NavLink to='/login'>Login</NavLink>
          </li>
        }
      </ul>
    </div>
  );
}