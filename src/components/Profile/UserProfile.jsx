import React from 'react';
import ProfileForm from './ProfileForm/ProfileForm';

import styles from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={styles.container}>
      {/* Headline */}
      <h1 className={styles.headline}>
        Your User Profile
      </h1>
      
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
