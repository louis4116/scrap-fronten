import { useState } from 'react';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useAppSelector } from '../../store';
import ProfileInfUser from './ProfileInfList/ProfileInfUser';
import ProfileImg from './ProfileInfList/ProfileImg/ProfileImg';
import FormInput from '../UI/FormInput/FormInput';
import { FormCate } from './ProfileInfList/support';
import { resetPasswordSchema } from '../../util/formValidation';
import { useResetPasswordMutation } from '../../api/authApi';
import useLoginState from '../../custom-hook/useLoginState';

const ProfileInf = () => {
  const [filebase64, setFileBase64] = useState<string>('');
  const [resetPassword] = useResetPasswordMutation();
  const { id, token } = useLoginState();
  const userData = useAppSelector((item) => item.authStoreResult.user);
  const { name, email, role, avatar } = userData;

  const handleReset = debounce(async (value, resetForm) => {
    await resetPassword({
      token,
      id,
      oldPassword: value.oldPassword,
      newPassword: value.newPassword,
    })
      .unwrap()
      .then(() =>
        Swal.fire({
          title: '成功',
          text: '修改成功!!!',
          icon: 'success',
          heightAuto: false,
        }),
      )
      .then(() => resetForm())
      .catch(() =>
        Swal.fire({
          title: '錯誤',
          text: '密碼錯誤!!!',
          icon: 'error',
          heightAuto: false,
        }),
      );
  }, 500);

  return (
    <div className="d-flex flex-column align-items-center w-100">
      <ProfileImg
        id={id}
        token={token}
        avatar={avatar}
        filebase64={filebase64}
        setFileBase64={setFileBase64}
      />
      <ProfileInfUser name={name} role={role} email={email} />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: '',
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={(value, { resetForm }) => {
          handleReset(value, resetForm);
        }}
      >
        <Form className="col-12 col-md-9 col-lg-6">
          {FormCate.map((item) => (
            <FormInput key={uuidv4()} {...item} />
          ))}
          <button type="submit" className="btn btn-primary">
            確認更改
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ProfileInf;
