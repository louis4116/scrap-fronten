import { useState, useEffect } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import { BiSolidNavigation } from 'react-icons/bi';
import Swal from 'sweetalert2';
import ProfileNewsListForm from './ProfileNewsListForm';
import useLoginState from '../../../custom-hook/useLoginState';
import { useDeleteNewsMutation } from '../../../api/userDataApi';
import './ProfileNewlist.scss';

const ProfileNewsList = ({ _id, date, title, img, url, memo }: DATAPROPS) => {
  const [newsImg, setNewsImg] = useState(
    'https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg',
  );
  const [deleteNews] = useDeleteNewsMutation();
  const { token } = useLoginState();
  const removeNew = async () => {
    Swal.fire({
      icon: 'question',
      title: '確認刪除?',
      showDenyButton: true,
      confirmButtonText: '確認',
      denyButtonText: '取消',
      heightAuto: false,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await deleteNews({ id: _id, token });
        }
      })
      .catch(() =>
        Swal.fire({
          icon: 'error',
          title: '錯誤!!',
          heightAuto: false,
        }),
      );
  };
  const navToSource = (e: string) => {
    if (url.includes('udn')) {
      window.open(`https://udn.com${e}`);
    } else {
      window.open(e);
    }
  };

  useEffect(() => {
    if (img) setNewsImg(img);
  }, [img]);
  return (
    <div className="d-flex align-items-center flex-md-row flex-column p-2 w-100">
      <div className="profile-newlist-img  d-flex align-items-center justify-content-center">
        <img src={newsImg} alt="" style={{ height: 'auto', width: '100%' }} />
      </div>
      <span className="profile-newlist-content d-flex align-items-center ms-4 w-100">
        <span className="d-flex flex-column">
          <div className="profile-newlist-title d-flex ">
            <h4>
              {title}
              <BiSolidNavigation
                title="來源"
                onClick={() => navToSource(url)}
                style={{ cursor: 'pointer' }}
              />
            </h4>
          </div>
          <p>日期：{date}</p>
          <ProfileNewsListForm newsId={_id} memo={memo} token={token} />
        </span>
        <span className="d-flex justify-content-end flex-fill">
          <FaDeleteLeft
            className="profile-newlist-delete"
            title="刪除"
            onClick={removeNew}
          />
        </span>
      </span>
    </div>
  );
};

export default ProfileNewsList;
