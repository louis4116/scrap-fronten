import { useEffect } from 'react';
import { useParams, useLocation, useOutletContext } from 'react-router-dom';
import { useGetNewsQuery } from '../../api/newsApi';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { newsStoreActions } from '../../store/newsStore';
import NewsList from '../NewsList/NewsList';

interface NewsComponent {
  newsName: string;
  category: { name: string; url: string }[];
  backPath: string;
}

const NewsAll = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { newsName, category, backPath }: NewsComponent = useOutletContext();
  const { id } = useParams();
  const { data, isFetching } = useGetNewsQuery({ id, backPath }, { skip: !id });
  const newsData = useAppSelector((state) => state.newsStoreResult[newsName]);
  useEffect(() => {
    if (data) {
      dispatch(
        newsStoreActions.storeNews({
          data: data.data,
          pathName: location.pathname,
        }),
      );
    }
  }, [data, dispatch, location.pathname]);
  return (
    <NewsList
      newsName={newsName}
      data={newsData}
      category={category}
      isFetching={isFetching}
    />
  );
};

export default NewsAll;
