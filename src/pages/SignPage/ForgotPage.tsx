import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useResetEmailMutation } from '../../api/authApi';
import FormInput from '../../component/UI/FormInput/FormInput';
import Sign from '../../component/UI/Sign/Sign';
import { emailValidationSchema } from '../../util/formValidation';

const ForgotPage = () => {
  const [resetEmail] = useResetEmailMutation();
  const handleForgot = debounce(async (value) => {
    await resetEmail({
      email: value.resetEmail,
    })
      .unwrap()
      .then(() =>
        Swal.fire({
          icon: 'success',
          title: '成功！！！',
          text: '請確認信箱是否收到信件',
        }),
      )
      .catch(() =>
        Swal.fire({
          icon: 'error',
          title: '錯誤！！！',
          text: '出現錯誤，請稍後再試',
        }),
      );
  }, 1000);

  return (
    <Sign>
      <Formik
        initialValues={{
          resetEmail: '',
        }}
        validationSchema={emailValidationSchema}
        onSubmit={(value) => {
          handleForgot(value);
        }}
      >
        <Form>
          <FormInput id="resetEmail" type="email" name="註冊信箱" />
          <button type="submit" className="btn btn-primary w-100">
            送出
          </button>
        </Form>
      </Formik>
    </Sign>
  );
};

export default ForgotPage;
