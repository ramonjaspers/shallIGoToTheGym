import { TailSpin } from 'react-loader-spinner';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.js';

/**
 * Just a general logout page where people can navigte to where logout gets called
 * @returns void
 */
export default function Logout() {
  const { logout } = useContext(AuthContext);

  setTimeout(() => {
    // add 3 sec delay because of fancyness. I want to see a loader! :D
    logout();
  }, 3000);

  return (
    <div className='content'>
      <div className='container'>
        <h6> Logging you out... </h6>
        <TailSpin color="#00BFFF" height={'10vw'} width={'10vw'} />
      </div>
    </div>
  );
}

