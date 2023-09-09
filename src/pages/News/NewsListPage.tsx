import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { cnaCategory } from './category/cnaCategory';
import { ltnCategory } from './category/ltnCategory';
import { ltnMiliCategory } from './category/ltnMiliCategory';
import { udnCategory } from './category/udnCategory';
import {
  useGetCnaNewsQuery,
  useGetLtnMilitaryQuery,
  useGetLtnNewsQuery,
  useGetUdnNewsQuery,
} from '../../api/newsApi';
import NewsHeader from '../../component/Nav/NewsHeader';

const NewsListPage = () => {
  const [outletState, setOutletState] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('ltn')) {
      setOutletState({
        newsName: 'ltn',
        useQuery: useGetLtnNewsQuery,
        category: ltnCategory,
      });
    } else if (location?.pathname.includes('military')) {
      setOutletState({
        newsName: 'military',
        useQuery: useGetLtnMilitaryQuery,
        category: ltnMiliCategory,
      });
    } else if (location?.pathname.includes('udn')) {
      setOutletState({
        newsName: 'udn',
        useQuery: useGetUdnNewsQuery,
        category: udnCategory,
      });
    } else if (location?.pathname.includes('cna')) {
      setOutletState({
        newsName: 'cna',
        useQuery: useGetCnaNewsQuery,
        category: cnaCategory,
      });
    }
  }, [location.pathname]);

  return (
    <>
      {Object.keys(outletState).length !== 0 && (
        <div className="d-flex align-items-center flex-column w-100">
          <NewsHeader />
          <Outlet context={outletState} />
        </div>
      )}
    </>
  );
};

export default NewsListPage;
