import { FaDeleteLeft } from 'react-icons/fa6';
import { BiSolidNavigation } from 'react-icons/bi';
import Swal from 'sweetalert2';
import ProfileNewsListForm from './ProfileNewsListForm';
import useLoginState from '../../../custom-hook/useLoginState';
import { useDeleteNewsMutation } from '../../../api/userDataApi';
import './ProfileNewlist.scss';

const ProfileNewsList = ({ _id, date, title, img, url, memo }: DATAPROPS) => {
  const [deleteNews] = useDeleteNewsMutation();
  const { token } = useLoginState();
  const removeNew = async () => {
    Swal.fire({
      icon: 'question',
      title: '確認刪除?',
      showDenyButton: true,
      confirmButtonText: '確認',
      denyButtonText: '取消',
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
  return (
    <>
      <div className="d-flex align-items-center p-2 flex-fill">
        <div
          className="overflow-hidden"
          style={{
            maxWidth: '272px',
            maxHeight: '170px',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <img src={img} alt="" style={{ height: 'auto', width: '100%' }} />
        </div>
        <span className="ms-4">
          <span className="d-flex align-items-center">
            <h4>{title}</h4>
            <h4 onClick={() => navToSource(url)} style={{ cursor: 'pointer' }}>
              <BiSolidNavigation title="來源" />
            </h4>
          </span>
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
      </div>
    </>
  );
};

export default ProfileNewsList;
