import { Formik, Form } from 'formik';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useResetPasswordFromEmailMutation } from '../../api/authApi';
import { resetPasswordFromEmailSchema } from '../../util/formValidation';
import Sign from '../../component/UI/Sign/Sign';
import FormInput from '../../component/UI/FormInput/FormInput';

const ResetPage = () => {
  const { id } = useParams();
  const [resetPasswordFromEmail] = useResetPasswordFromEmailMutation();
  const navigate = useNavigate();

  const handleReset = debounce(async (value) => {
    await resetPasswordFromEmail({
      id,
      newPassword: value.newPassword,
      newPasswordConfirm: value.newPasswordConfirm,
    })
      .unwrap()
      .then((e) =>
        Swal.fire({
          icon: 'success',
          title: '成功！！！',
          text: '稍後將導至登入頁面',
          confirmButtonText: '確認',
          heightAuto: false,
        }),
      )
      .then((e) => {
        if (e.isConfirmed) {
          navigate('/signup');
        }
      })
      .catch(() =>
        Swal.fire({
          icon: 'error',
          title: '錯誤！！！',
          text: '出現錯誤，令牌過期或是其他錯誤',
          heightAuto: false,
        }),
      );
  }, 1000);

  return (
    <Sign>
      <Formik
        initialValues={{
          newPassword: '',
          newPasswordConfirm: '',
        }}
        validationSchema={resetPasswordFromEmailSchema}
        onSubmit={(value) => {
          handleReset(value);
        }}
      >
        <Form>
          <FormInput id="newPassword" type="password" name="新密碼" />
          <FormInput
            id="newPasswordConfirm"
            type="password"
            name="新密碼確認"
          />
          <button type="submit" className="btn btn-primary w-100">
            送出
          </button>
        </Form>
      </Formik>
    </Sign>
  );
};

export default ResetPage;
