import React from 'react';

import styles from './StartingPageContent.module.css';

const StartingPageContent = () => {
  return (
    <section className={styles.container}>
      {/* Headline */}
      <h1 className={styles.headline}>
        Welcome on Board!
      </h1>
    </section>
  );
};

export default StartingPageContent;
