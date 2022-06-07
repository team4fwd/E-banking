import { useState, useEffect } from 'react';
import styles from './Alert.module.scss';
import AlertMUI from '@mui/material/Alert';

const Alert = ({ variant, msg, time = 3 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, time * 1000);

    return () => {
      setShow(true);
      clearTimeout(timer);
    };
  }, [time, msg]);

  return (
    <>
      {show && (
        <AlertMUI
          sx={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.6rem',
          }}
          severity={`${variant}`}
        >
          {msg}
        </AlertMUI>
        // <div className={`${styles.alert} ${styles[`alert--${variant}`]}`}>
        //   {msg}
        // </div>
      )}
    </>
  );
};

export default Alert;
