import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../store';
import Pagination from '../UI/Pagination/Pagination';
import Loading from '../Loading/Loading';
import NewsCard from '../UI/NewsCard/NewsCard';
import './newlist.scss';

interface Props {
  data: NewsItem[] | undefined;
  category: { name: string; url: string }[];
  newsName: string;
  isFetching: boolean;
}

const NewsList = ({ data, category, newsName, isFetching }: Props) => {
  const [indexOfLast, setIndexOfLast] = useState(1);
  const [indexOfFirst, setindexOfFirst] = useState(1);
  const [current, setCurrent] = useState(1);
  const newsData = useAppSelector((state) => state.newsStoreResult[newsName]);

  useEffect(() => {
    setIndexOfLast(current * 12);
    let result = current * 12;
    setindexOfFirst(result - 12);
  }, [data, current]);
  const getStyles = (status: any) => {
    const { isActive } = status;
    if (isActive) return 'new-list-nav-link nav-link active px-2';
    else return 'nav-link px-2';
  };
  const renderList =
    data?.length !== 0 && !isFetching ? (
      <div className="newlist-detail p-4">
        <div className="row d-flex justify-content-center">
          {data?.slice(indexOfFirst, indexOfLast).map((item) => {
            let id = uuidv4();
            return <NewsCard key={id} {...item} />;
          })}
        </div>

        <nav className="d-flex justify-content-center align-items-center">
          <Pagination
            length={data?.length}
            current={current}
            number={12}
            setCurrent={setCurrent}
          />
        </nav>
      </div>
    ) : (
      <Loading />
    );

  return (
    <>
      <header className="category-header d-flex justify-content-center align-items-center w-100">
        <ul className="newlist-detail-category-ul nav nav-pills d-flex flex-row align-items-center navbar-nav">
          {category.map((item) => (
            <li key={uuidv4()} className="nav-item fs-5 p-2">
              <NavLink
                to={`/news/${newsName}/${item.url}`}
                className={(status) => getStyles(status)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </header>
      {newsData.length !== 0 && <h3>本次搜尋結果:{newsData.length}筆</h3>}
      {renderList}
    </>
  );
};

export default NewsList;
