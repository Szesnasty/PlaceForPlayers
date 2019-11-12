import React from 'react';
import styles from 'components/HomeWrapper/HomeWrapper.module.scss';

const HomeWrapper = (props) => {
    return ( 
        <div className={styles.homeWrapper}>
            {props.children}
        </div>
        
     );
}
 
export default HomeWrapper;