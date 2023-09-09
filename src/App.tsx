import { useRoutes } from 'react-router-dom';
import { newsRoute } from './route/Route';
import SideBar from './component/SideBar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

function App() {
  const routes = useRoutes(newsRoute());

  return (
    <div className="App" style={{ height: '100%' }}>
      <div
        className="news-header d-flex flex-row flex-nowrap"
        style={{ height: '100%' }}
      >
        <ul
          className="nav nav-pills d-flex align-items-start flex-column flex-shrink-0 py-3 shadow-lg rounded-end"
          style={{
            width: '8rem',
            backgroundColor: '#0d6efd',
            zIndex: '100',
          }}
        >
          <SideBar />
        </ul>
        {routes}
      </div>
    </div>
  );
}

export default App;
