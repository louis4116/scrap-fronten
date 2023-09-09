import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import './profilelink.scss';

interface CategoryProps {
  name: string;
  path: string;
  personal: string;
  setPersonal: (value: string) => void;
}

const ProfileLink = ({ name, path, personal, setPersonal }: CategoryProps) => {
  const { pathname } = useLocation();
  const personalStyle =
    'personal-page-category list-group-item d-flex px-4 py-3 mt-1';

  useEffect(() => {
    if (pathname.includes('storedNews')) {
      setPersonal(path);
    } else {
      setPersonal('');
    }
  }, []);
  return (
    <Link
      to={`/personal/${path}`}
      className={
        path === personal ? `${personalStyle} bg-checked` : `${personalStyle}`
      }
      onClick={() => setPersonal(path)}
    >
      <div className="d-flex align-items-center">
        <FaPen />
        <span className="ps-3">{name}</span>
      </div>
    </Link>
  );
};

export default ProfileLink;
