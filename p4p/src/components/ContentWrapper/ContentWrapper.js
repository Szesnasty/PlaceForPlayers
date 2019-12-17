import React from 'react';
import styles from 'components/ContentWrapper/ContentWrapper.module.scss';

const ContentWrapper = props => {
  const { children } = props;
  return <div className={styles.ContentWrapper}>{children}</div>;
};

export default ContentWrapper;
