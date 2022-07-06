import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Button from '../Button/Button';

import styles from './Header.module.css';

const Header = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <header className={styles.container}>
      {/* LogoLink */}
      <Link className={styles.logoLink} to='/'>
        {/* Logo */}
        <div className={styles.logo}>React Auth</div>
      </Link>
      <nav>
        {/* List */}
        <ul className={styles.list}>
          {!isLoggedIn && (
            <li className={styles.listItem}>
              <Link
                className={styles.link} 
                to='/auth'
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link
                className={styles.link} 
                to='/profile'
              >
                Profile
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className={styles.listItem}>
              {/* Button */}
              <Button
                onClick={logoutHandler}
                className={styles.button}
              >
                Logout  
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
