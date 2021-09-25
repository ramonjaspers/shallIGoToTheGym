import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { GlobalContext } from '../components/globals';

export default function Navigation() {
  const globalState = useContext(GlobalContext);
  const history = useHistory();

  return (
    <div class='App-header'>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {globalState.isAuthenticated === true ?
          <>
            <li>
              <NavLink to="/blogposts">Blogposts</NavLink>
            </li>
            <li>
              <button type="button" onClick={() => {
                globalState.setAuthenticated(false);
                history.push('/');
              }}>Uitloggen</button>
            </li>
          </>
          :
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        }
      </ul>
    </div>
  );
}