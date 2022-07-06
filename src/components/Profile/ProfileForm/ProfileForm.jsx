import React, {useRef, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../store/auth-context';
import Button from '../../Button/Button';

import styles from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInput = useRef();
  const authCtx = useContext(AuthContext);
  const API_KEY = 'AIzaSyBomhfI11cBjU-sV0oSv07gAjzo3rNlFIs';

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordInput.current.value;

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`, {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: false,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      //assumption: always succeds!
      history.replace('/');
    });
  }

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      {/* Control */}
      <div className={styles.control}>
        {/* Label */}
        <label
          className={styles.label}
          htmlFor='new-password'
        >
          New Password
        </label>
        {/* Input */}
        <input 
          className={styles.input}
          type='password' 
          minLength="7"
          ref={newPasswordInput}
          id='new-password' 
        />
      </div>

      {/* Button Container */}
      <div className={styles.buttonContainer}>
        {/* Button */}
        <Button className={styles.button}>
          Change Password
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
