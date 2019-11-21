import React from 'react';
import styles from 'components/Wrapper/Wrapper.module.scss';

const Wrapper = props => {
  const { children } = props;
  return <div className={styles.Wrapper}>{children}</div>;
};

export default Wrapper;
