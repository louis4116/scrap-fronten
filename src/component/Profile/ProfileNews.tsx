import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';
import { useAppSelector } from '../../store';
import UserNewsCategory from '../UI/UserNewsCategory/UserNewsCategory';
import ProfileNewsList from './ProfileNewsList/ProfileNewsList';
import Pagination from '../UI/Pagination/Pagination';
import CheckSort from '../UI/CheckSort/CheckSort';
import { category } from './support';

const ProfileNews = () => {
  const [render, setRender] = useState<string>('ltn');
  const [search, setSearch] = useState<string>('');
  const [indexOfLast, setIndexOfLast] = useState(1);
  const [indexOfFirst, setindexOfFirst] = useState(1);
  const [current, setCurrent] = useState(1);
  const [renderNews, setRenderNews] = useState<DATAPROPS[]>([]);
  const newsData = useAppSelector((item) => item?.userNewsStoreResult.news);
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const debounceChange = debounce(handlerChange, 300);
  useEffect(() => {
    const tempNews = newsData.filter(
      (item: DATAPROPS) => item.source === render,
    );
    const result = tempNews.filter((item: DATAPROPS) =>
      item.title.includes(search),
    );
    setIndexOfLast(current * 8);
    let tempCurrent = current * 8;
    setindexOfFirst(tempCurrent - 8);
    setRenderNews(result);
  }, [render, newsData, search, current]);
  return (
    <>
      <span className="d-flex align-items-center justify-content-center form-floating w-50">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="搜尋"
          onChange={debounceChange}
        />
        <label htmlFor="floatingInput" className="fs-6">
          搜尋
        </label>
      </span>
      <ul className="navbar">
        {category?.map((item) => (
          <UserNewsCategory
            key={uuidv4()}
            {...item}
            render={render}
            setRender={setRender}
          />
        ))}
        <CheckSort renderNews={renderNews} setRenderNews={setRenderNews} />
      </ul>

      <div className="d-flex align-items-center justify-content-center flex-column w-100">
        {renderNews.length === 0 ? (
          <h1 className="d-flex align-items-center justify-content-center">
            無資料
          </h1>
        ) : (
          <>
            {renderNews
              ?.slice(indexOfFirst, indexOfLast)
              .map((item) => <ProfileNewsList key={uuidv4()} {...item} />)}
            <span className="d-flex align-items-center justify-content-center w-100">
              <Pagination
                length={renderNews?.length}
                current={current}
                number={8}
                setCurrent={setCurrent}
              />
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileNews;
