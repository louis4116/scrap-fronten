import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { newsRoute } from './route/Route';
import SideBar from './component/SideBar/SideBar';
import Loading from './component/Loading/Loading';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.scss';

function App() {
  const routes = useRoutes(newsRoute());

  return (
    <div className="App" style={{ height: '100%' }}>
      <div
        className="news-header d-flex flex-column flex-sm-row flex-nowrap"
        style={{ height: '100%' }}
      >
        <ul className="App-nav nav nav-pills flex-column flex-shrink-0 py-3 shadow-lg rounded-end">
          <SideBar />
        </ul>
        {routes}
      </div>
    </div>
  );
}

export default App;
