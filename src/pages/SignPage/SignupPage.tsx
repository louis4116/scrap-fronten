import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../../component/SignUp/SignUp';
import SignIn from '../../component/SignIn/SignIn';
import Sign from '../../component/UI/Sign/Sign';

const SignupPage = () => {
  const [show, setShow] = useState(true);

  return (
    <Sign>
      {show ? <SignIn /> : <SignUp setShow={setShow} />}
      <div className="d-flex align-items-center mt-3">
        <span
          className="link-primary"
          style={{ cursor: 'pointer' }}
          onClick={() => setShow(!show)}
        >
          {show ? '註冊' : '登入'}
        </span>
        <span className="ms-auto">
          <Link to="/forgetPassword" className="text-decoration-none">
            忘記密碼
          </Link>
        </span>
      </div>
    </Sign>
  );
};

export default SignupPage;
