import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Just a general logout page where people can navigte to where logout gets called
 * @returns void
 */
export default function Logout() {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, []);
}

