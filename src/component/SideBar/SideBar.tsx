import { useDispatch } from 'react-redux';
import { FaHome, FaUser } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authStoreActions } from '../../store/authStore';
import useLoginState from '../../custom-hook/useLoginState';
import './sidebar.scss';

const linkStyle =
  'side-bar nav-item d-flex align-items-center text-decoration-none w-100 ps-3 py-3';
const sideBar = 'side-bar-icon me-1';

const SideBar = () => {
  const { pathname } = useLocation();
  const { status } = useLoginState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    Swal.fire({
      title: '確認登出？',
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: '確認',
      denyButtonText: '返回',
      heightAuto: false,
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(authStoreActions.removeToken());
          navigate('/news');
        }
      })
      .catch(() =>
        Swal.fire({
          title: '錯誤！！！',
          icon: 'error',
          heightAuto: false,
        }),
      );
  };
  const loginStates =
    status === 'success' ? (
      <div className={linkStyle} onClick={signOut}>
        <FiLogOut className={sideBar} />
        登出
      </div>
    ) : (
      <Link
        to="/signup"
        className={
          pathname.includes('/signup') ? `${linkStyle} text-white` : linkStyle
        }
      >
        <FiLogIn className={sideBar} />
        登入
      </Link>
    );
  return (
    <>
      <Link
        to="/news"
        className={
          pathname.includes('/news') ? `${linkStyle} text-white` : linkStyle
        }
      >
        <FaHome className={sideBar} />
        首頁
      </Link>
      {status === 'success' && (
        <Link
          to="/personal"
          className={
            pathname.includes('/personal')
              ? `${linkStyle} text-white`
              : linkStyle
          }
        >
          <FaUser className={sideBar} />
          個人檔案
        </Link>
      )}
      {loginStates}
    </>
  );
};

export default SideBar;
