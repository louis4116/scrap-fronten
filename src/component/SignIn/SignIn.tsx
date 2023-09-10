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
          heightAuto: false,
        }),
      )
      .then(() => navigate('/news'))
      .catch(() =>
        Swal.fire({
          title: '登入失敗',
          icon: 'error',
          text: '請確認信箱或密碼是否正確',
          heightAuto: false,
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
