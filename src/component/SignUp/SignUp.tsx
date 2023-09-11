import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useSignUpMutation } from '../../api/authApi';
import FormInput from '../UI/FormInput/FormInput';
import { signUpSchema } from '../../util/formValidation';

interface SignUpProps {
  setShow: (value: boolean) => void;
}

const SignUp = ({ setShow }: SignUpProps) => {
  const [signUp] = useSignUpMutation();

  const handleSignup = debounce(async (value) => {
    await signUp({
      name: value.signUpName,
      email: value.signUpEmail,
      password: value.signUpPassword,
    })
      .then(() =>
        Swal.fire({
          title: '註冊成功',
          icon: 'success',
          heightAuto: false,
        }),
      )
      .then(() => setShow(true))
      .catch(() =>
        Swal.fire({
          title: '註冊失敗',
          icon: 'error',
          text: '註冊失敗，請稍後在試',
          heightAuto: false,
        }),
      );
  }, 500);

  return (
    <Formik
      initialValues={{
        signUpName: '',
        signUpEmail: '',
        signUpPassword: '',
        signInPasswordConfirm: '',
      }}
      validationSchema={signUpSchema}
      onSubmit={(value) => {
        handleSignup(value);
      }}
    >
      <Form>
        <FormInput id="signUpName" type="text" name="暱稱" />
        <FormInput id="signUpEmail" type="email" name="信箱" />
        <FormInput id="signUpPassword" type="password" name="密碼" />
        <FormInput id="signInPasswordConfirm" type="password" name="密碼確認" />
        <button className="btn btn-primary w-100" type="submit">
          註冊
        </button>
      </Form>
    </Formik>
  );
};

export default SignUp;
