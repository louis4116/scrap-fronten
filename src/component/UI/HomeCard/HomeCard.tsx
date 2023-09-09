import { Link } from 'react-router-dom';

interface HomeCardProps {
  name: string;
  introduction: string;
  img: string;
  link: string;
}

const HomeCard = ({ name, introduction, img, link }: HomeCardProps) => {
  return (
    <div className="card m-2 p-2 col-lg">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '10rem' }}
      >
        <img className="img-fluid" src={img} alt="" />
      </div>
      <div className="card-body">
        <h5 className="card-title border-bottom border-dark">{name}</h5>
        <p className="card-text">{introduction}</p>
        <Link to={`${link}`} className="btn btn-primary">
          前往{name}
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
