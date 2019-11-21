import React from 'react';
import 'components/Loading/Loading.scss';

const Loading = () => {
  return (
    <div className="lds-dual-ring">
      <div className="lds-dual-ring__body" />
    </div>
  );
};

export default Loading;
