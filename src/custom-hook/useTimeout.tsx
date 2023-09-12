import { useState, useEffect } from 'react';

const useTimeout = (number: number) => {
  const [time, setTime] = useState(number);
  useEffect(() => {
    let countTime: any;
    if (time > 0) {
      countTime = setInterval(() => {
        setTime((pre) => pre - 1);
      }, 1000);
    }
    return () => clearInterval(countTime);
  }, [time]);
  return time;
};

export default useTimeout;
