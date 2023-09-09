import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import FormInput from '../UI/FormInput/FormInput';
import { useDispatch } from 'react-redux';
import { authStoreActions } from '../../store/authStore';
import { useSignInMutation } from '../../api/authApi';
import { signInSchema } from '../../util/formValidation';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const handleSign = debounce(async (value) => {
    await signIn({
      email: value.signInEmail,
      password: value.signInPassword,
    })
      .unwrap()
      .then((e) => {
        dispatch(authStoreActions.storeToken(e));
      })
      .then(() =>
        Swal.fire({
          title: '登入成功',
          icon: 'success',
          text: '稍後會導引至首頁',
          timer: 2000,
        }),
      )
      .then(() => navigate('/news'))
      .catch(() =>
        Swal.fire({
          title: '登入失敗',
          icon: 'error',
          text: '請確認信箱或密碼是否正確',
        }),
      );
  }, 500);

  return (
    <Formik
      initialValues={{
        signInEmail: '',
        signInPassword: '',
      }}
      validationSchema={signInSchema}
      onSubmit={(value) => {
        handleSign(value);
      }}
    >
      <Form>
        <FormInput id="signInEmail" type="email" name="信箱" />
        <FormInput id="signInPassword" type="password" name="密碼" />
        <button className="btn btn-primary w-100" type="submit">
          登入
        </button>
      </Form>
    </Formik>
  );
};

export default SignIn;

{
  /* <div
className="flex-fill d-flex align-items-center justify-content-center shadow"
style={{ zIndex: '5' }}
>
<div className="p-5 rounded bg-white shadow" style={{ width: '400px' }}>
  <span className="d-flex align-items-center justify-content-center mb-2">
    <FaRegNewspaper fontSize={30} />
    <h2 style={{ marginBottom: '0' }}>台灣即時新聞網</h2>
  </span>
  <div className="d-flex align-items-center mt-3">
          <span
            className="link-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setShow(false)}
          >
            註冊
          </span>
          <span className="ms-auto">
            <Link to="/forgetPassword" className="">
              忘記密碼
            </Link>
          </span>
        </div>
      </div>
    </div> */
}
