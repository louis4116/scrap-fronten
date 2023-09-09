import { useEffect } from 'react';
import { useParams, useLocation, useOutletContext } from 'react-router-dom';
import { useGetLtnNewsQuery } from '../../api/newsApi';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { newsStoreActions } from '../../store/newsStore';
import NewsList from '../NewsList/NewsList';

interface NewsComponent {
  newsName: string;
  useQuery: typeof useGetLtnNewsQuery;
  category: { name: string; url: string }[];
}

const NewsAll = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { newsName, useQuery, category }: NewsComponent = useOutletContext();
  const { id } = useParams();
  const { data, isFetching } = useQuery({ id });
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
  }, [data]);
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
