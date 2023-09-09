import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { category } from './support';
import { useAppDispatch, useAppSelector } from '../../store';
import { authStoreActions } from '../../store/authStore';
import { userNewsAction } from '../../store/userNewsStore';
import { useGetUserDataQuery } from '../../api/userDataApi';
import Loading from '../../component/Loading/Loading';
import ProfileLink from '../../component/UI/ProfileLink/ProfileLink';
import useLoginState from '../../custom-hook/useLoginState';
import './personalPage.scss';

const PersonalPage = () => {
  const [personal, setPersonal] = useState('');
  const dispatch = useAppDispatch();
  const { status, token } = useLoginState();
  const { data } = useGetUserDataQuery({ token });
  const navigate = useNavigate();
  const user = useAppSelector((item) => item?.authStoreResult.user);

  useEffect(() => {
    if (status !== 'success') {
      navigate('/signup');
    }
  }, [status]);
  useEffect(() => {
    dispatch(authStoreActions.storeUser(data?.data));
    dispatch(userNewsAction.storeUserNews(data?.data.news));
  }, [data, dispatch]);
  return (
    <div className="d-flex flex-column flex-fill">
      <nav className="conatiner-fluid nav-bar p-3 bg-white shadow-sm">
        <h3 style={{ color: '#3C4048' }}>個人檔案</h3>
      </nav>

      <div className="d-flex flex-column flex-md-row flex-fill mt-2 overflow-hidden">
        <ul
          className="d-flex flex-column list-group list-group-flush bg-white"
          style={{ minWidth: '210px' }}
        >
          {category.map((item) => (
            <ProfileLink
              key={item.path}
              name={item.name}
              path={item.path}
              personal={personal}
              setPersonal={setPersonal}
            />
          ))}
        </ul>

        <div className="p-4 mx-2 bg-white w-100 h-100 overflow-auto">
          <div className="d-flex align-items-center flex-xl-row flex-column">
            <div className="d-flex align-items-center flex-column w-100 position-relative">
              {Object.keys(user).length === 0 ? <Loading /> : <Outlet />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
