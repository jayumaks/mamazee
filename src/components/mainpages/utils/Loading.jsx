import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div
      style={{
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Oval color='#730071' height='50' width='50' />;
    </div>
  );
};

export default Loading;
