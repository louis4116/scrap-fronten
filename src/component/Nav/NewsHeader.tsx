import { NavLink, useLocation } from 'react-router-dom';
import { FaRegNewspaper } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';
import { newsCompany } from './category';
import './newsheader.scss';

interface StyleProps {
  isActive: boolean;
  url: string;
}

const NewsHeader = () => {
  const location = useLocation();
  const getStyles = (items: StyleProps) => {
    const { url, isActive } = items;
    if (location.pathname.includes(url) || isActive)
      return 'nav-link active px-2';
    else return 'nav-link px-2';
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h2 className="news-header-h2 p-2">
        台灣即時新聞
        <FaRegNewspaper />
      </h2>
      <ul className="news-header nav nav-tabs d-flex flex-row align-items-center navbar-nav">
        {newsCompany.map((items) => (
          <li className="nav-item fs-4 px-2" key={uuidv4()}>
            <NavLink
              to={`/news/${items.url}/${items.first}`}
              className={({ isActive }) =>
                getStyles({ isActive, url: items.url })
              }
            >
              {items.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsHeader;
