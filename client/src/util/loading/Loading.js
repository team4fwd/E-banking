import React from 'react';
import { Triangle } from 'react-loader-spinner';
import './loading.css';
function Loadingpage() {
  return (
    <div align='center'>
      <div className='flex justify-center items-center loader-circle'>
        <Triangle
          color='red'
          height={70}
          width={70}
          timeout={3000}
          opacity='0.6'
        />
      </div>
    </div>
  );
}

export default Loadingpage;
