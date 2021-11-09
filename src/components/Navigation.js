import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/styles/Navigation.css';

/**
 * Renders the navigation bar
 * @returns {render}
 */
export default function Navigation() {
  const { user } = useContext(AuthContext);

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
              <p id='dropdownButton'>{user.username} 👤</p>
              <div id='dropdownContent'>
                <NavLink className='dropdownItem' to='/profile'>Profile 💪</NavLink>
                <NavLink className='dropdownItem' to='/logout'>Logout 🚪</NavLink>
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