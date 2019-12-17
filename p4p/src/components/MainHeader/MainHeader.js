import React from 'react';
import styles from 'components/MainHeader/MainHeader.module.scss';
import facebookIcon from 'assets/facebook.png';
import gitHubIcon from 'assets/github.png';
import logoImage from 'assets/logo.png';

console.log(logoImage);
const MainHeader = () => {
  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainHeader__mediaWrapper}>
        <img className={styles.mainHeader__logo} alt="logo" src={logoImage} />
        <img className={styles.mainHeader__socialMedia} alt="facebook" src={facebookIcon} />
        <img className={styles.mainHeader__socialMedia} alt="github" src={gitHubIcon} />
      </div>
    </header>
  );
};

export default MainHeader;
