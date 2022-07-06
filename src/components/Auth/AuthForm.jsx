import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context';
import Button from '../Button/Button';

import styles from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const API_KEY = 'AIzaSyBomhfI11cBjU-sV0oSv07gAjzo3rNlFIs';

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url =
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = 'Authentication failed!';

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={styles.container}>
      {/* Headline */}
      <h1 className={styles.headline}>
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>

      <form onSubmit={submitHandler}>
        {/* Email */}
        <div className={styles.control}>
          <label
            className={styles.label}
            htmlFor='email'
          >
            Your Email
          </label>
          <input 
            className={styles.input}
            type='email'
            id='email'
            ref={emailInputRef}
            required 
          />
        </div>

        {/* Password */}
        <div className={styles.control}>
          <label
            className={styles.label}
            htmlFor='password'
          >
            Your Password
          </label>
          <input 
            className={styles.input}
            type='password'
            id='password'
            ref={passwordInputRef}
            required 
          />
        </div>
        
        {/* Buttons Container */}
        <div className={styles.buttonsContainer}>
          {/* Button */}
          <Button className={styles.button}>
            {isLogin ? 'Login' : 'Create Account'}
          </Button>

          {/* Toggle */}
          <Button
            onClick={switchAuthModeHandler}
            className={styles.toggle}
            type='button'
          >
            {!isLoading && isLogin ? 'Create new account' : 'Login with existing account'}
            {isLoading && <p>Loading...</p>}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
