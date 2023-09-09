import { useSelector } from 'react-redux';

interface LoginState {
  authStoreResult: { loginState: AuthState };
}

const useLoginState = () => {
  const loginState = useSelector(
    (state: LoginState) => state?.authStoreResult?.loginState,
  );
  return {
    status: loginState?.status,
    id: loginState?.id,
    token: loginState?.token,
  };
};

export default useLoginState;
