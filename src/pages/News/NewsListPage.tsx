import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { newsCategory } from './newsCategory';
import NewsHeader from '../../component/Nav/NewsHeader';

const NewsListPage = () => {
  const [outletState, setOutletState] = useState({});
  const location = useLocation();
  useEffect(() => {
    const findCategory = newsCategory.find(
      (item) => location?.pathname.includes(item.path),
    );
    if (findCategory) {
      setOutletState({
        newsName: findCategory.path,
        category: findCategory.content,
        backPath: findCategory.backPath,
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
