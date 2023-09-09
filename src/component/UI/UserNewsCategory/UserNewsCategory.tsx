import './usernewscategory.scss';
interface UserNews {
  name: string;
  cate: string;
  render: string;
  setRender: (value: string) => void;
}

const UserNewsCategory = ({ name, cate, render, setRender }: UserNews) => {
  const filter = () => {
    setRender(cate);
  };
  return (
    <li
      className="user-news-category navbar-nav nav-item mx-2"
      onClick={filter}
      style={{ cursor: 'pointer' }}
    >
      <span className={cate === render ? 'nav-link active' : 'nav-link'}>
        {name}
      </span>
    </li>
  );
};

export default UserNewsCategory;
