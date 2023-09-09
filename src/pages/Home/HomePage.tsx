import { v4 as uuidv4 } from 'uuid';
import NewsHeader from '../../component/Nav/NewsHeader';
import HomeCard from '../../component/UI/HomeCard/HomeCard';
import { newsIntroduction } from './support';
const HomePage = () => {
  return (
    <>
      <div className="d-flex align-items-center flex-column w-100">
        <NewsHeader />
        <div className="container overflow-auto">
          <div className="row">
            {newsIntroduction.map((item) => (
              <HomeCard
                key={uuidv4()}
                name={item.name}
                introduction={item.introduction}
                img={item.img}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
