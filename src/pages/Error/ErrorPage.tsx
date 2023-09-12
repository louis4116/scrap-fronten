import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTimeout from '../../custom-hook/useTimeout';

const ErrorPage = () => {
  const time = useTimeout(3);
  const navigate = useNavigate();

  //時間到會自動跳轉到首頁
  useEffect(() => {
    if (time === 0) {
      navigate('/news');
    }
  }, [time, navigate]);
  return (
    <div className="flex-fill d-flex align-items-center justify-content-center flex-column fs-2">
      <h1>404 NOT FOUND</h1>
      <p>找不到網址，請重新確認網址</p>
      <p>{time}秒後將會導引至首頁</p>
    </div>
  );
};

export default ErrorPage;
