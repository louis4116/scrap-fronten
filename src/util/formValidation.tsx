import * as yup from 'yup';

const userNameValid = /^[^`~!@#$%^&*()_+={}\]|\\:;“’<,>.?๐฿]*$/;

export const signUpSchema = yup.object().shape({
  signUpName: yup
    .string()
    .matches(userNameValid, '格式錯誤！！！')
    .min(3, '不可低於3個字元')
    .required('欄位不得為空'),
  signUpEmail: yup.string().email('電子郵件格式錯誤').required('欄位不得為空'),
  signUpPassword: yup
    .string()
    .min(6, '密碼長度不得低於6位數')
    .max(12, '密碼長度不得超過12位數')
    .required('欄位不得為空'),
  signInPasswordConfirm: yup
    .string()
    .nullable()
    .oneOf([yup.ref('signUpPassword'), null], '密碼不符合!!')
    .required('欄位不得為空'),
});

export const signInSchema = yup.object().shape({
  signInEmail: yup.string().email('電子郵件格式錯誤').required('欄位不得為空'),
  signInPassword: yup
    .string()
    .min(6, '密碼長度不得低於6位數')
    .max(12, '密碼長度不得超過12位數')
    .required('欄位不得為空'),
});

export const resetPasswordFromEmailSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(6, '密碼長度不得低於6位數')
    .max(12, '密碼長度不得超過12位數')
    .required('欄位不得為空'),
  newPasswordConfirm: yup
    .string()
    .nullable()
    .oneOf([yup.ref('newPassword'), null], '密碼不符合!!')
    .required('欄位不得為空'),
});

export const resetPasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, '密碼長度不得低於6位數')
    .max(12, '密碼長度不得超過12位數')
    .required('欄位不得為空'),
  newPassword: yup
    .string()
    .min(6, '密碼長度不得低於6位數')
    .max(12, '密碼長度不得超過12位數')
    .required('欄位不得為空'),
  newPasswordConfirm: yup
    .string()
    .nullable()
    .oneOf([yup.ref('newPassword'), null], '密碼不符合!!')
    .required('欄位不得為空'),
});

export const emailValidationSchema = yup.object().shape({
  resetEmail: yup.string().email('電子郵件格式錯誤').required('欄位不得為空'),
});
