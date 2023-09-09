import { FaRegNewspaper } from 'react-icons/fa6';
import './sign.scss';

interface signUpProps {
  children?: React.ReactNode;
}
const Sign = ({ children }: signUpProps) => {
  return (
    <>
      <div className="signupPage-container flex-fill d-flex">
        <div
          className="flex-fill d-flex align-items-center justify-content-center shadow"
          style={{ zIndex: '5' }}
        >
          <div
            className="p-5 rounded bg-white shadow"
            style={{ width: '400px' }}
          >
            <span className="d-flex align-items-center justify-content-center mb-2">
              <FaRegNewspaper fontSize={30} />
              <h2 style={{ marginBottom: '0' }}>台灣即時新聞網</h2>
            </span>
            {children}
          </div>
        </div>
      </div>
      <div className="sigunPage-image"></div>
    </>
  );
};

export default Sign;
