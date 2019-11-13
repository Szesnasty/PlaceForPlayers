import React from 'react';
import styles from 'components/HeroSection/HeroSection.module.scss';

const HeroSection = () => {
    return ( 
        <div className={styles.heroSection}>
            <h1 className={styles.heroSection__header}>place<span className={styles.heroSection__headerSpan}>4</span>players</h1>
        </div>
     );
}
 
export default HeroSection;