import useTimeout from '../../custom-hook/useTimeout';
import './loading.scss';

const Loading = () => {
  const time = useTimeout(10);
  return (
    <div className="loading-container d-flex flex-column align-items-center justify-content-center w-100">
      <p className="loading-p d-flex align-items-center ">
        讀取中<span></span>
        <span></span>
        <span></span>
      </p>
      {time === 0 ? (
        <div>讀取時間過久，請重新確認網址或重新整理</div>
      ) : (
        <div>讀取時間會因為個人設備、網路有所差異</div>
      )}
    </div>
  );
};

export default Loading;
