import { debounce } from 'lodash';
import { MdNewLabel } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useStoreNewsToUserMutation } from '../../../api/userDataApi';
import useLoginState from '../../../custom-hook/useLoginState';
import './card.scss';

const NewsCard = ({ source, date, title, url, img, summary }: NewsItem) => {
  const [defaultImg, setDefaultImg] = useState(
    'https://www.euractiv.com/wp-content/uploads/sites/2/2014/03/news-default.jpeg',
  );
  const [modDate, setModDate] = useState('');
  const [storeNewsToUser] = useStoreNewsToUserMutation();
  const { id, status, token } = useLoginState();
  const navToSource = (e: string) => {
    if (url.includes('udn')) {
      window.open(`https://udn.com${e}`);
    } else {
      window.open(e);
    }
  };
  const storeNews = debounce(async () => {
    await storeNewsToUser({
      id,
      modDate,
      source,
      title,
      url,
      img,
      summary,
      token,
    })
      .unwrap()
      .then(() =>
        Swal.fire({
          icon: 'success',
          title: '儲存成功！！！',
          confirmButtonText: '確認',
          heightAuto: false,
        }),
      )
      .catch(() =>
        Swal.fire({
          icon: 'error',
          title: '新聞已儲存！！！',
          confirmButtonText: '確認',
          heightAuto: false,
        }),
      );
  }, 500);

  useEffect(() => {
    if (img) {
      setDefaultImg(img);
    }
  }, [img]);
  useEffect(() => {
    if (!Date.parse(date)) {
      let temp = new Date();
      let tempYear = temp.getFullYear();
      let tempMonth = temp.getMonth() + 1;
      let tempDate = temp.getDate();
      setModDate(tempYear + '/' + tempMonth + '/' + tempDate + ' ' + date);
    } else {
      setModDate(date);
    }
  }, [date]);
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
      <div
        className="card border-bottom border-2 mb-4 mx-4 p-0"
        style={{ position: 'relative' }}
      >
        <div
          className="overflow-hidden"
          style={{
            maxHeight: '200px',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <img className="card-img-top img-fluid" src={defaultImg} alt="" />
        </div>

        {status === 'success' && (
          <MdNewLabel
            className="news-card-label"
            fontSize={40}
            onClick={storeNews}
          />
        )}
        <div className="card-body">
          <div className="card-title">{title}</div>
          {summary && (
            <p
              className="news-card-detail-summary card-text mt-2"
              style={{ maxHeight: '50px', overflow: 'hidden' }}
            >
              {summary}
            </p>
          )}
          <button className="btn btn-primary" onClick={() => navToSource(url)}>
            看更多
          </button>
        </div>
        <div className="card-footer">
          <small className="text-muted">{modDate}</small>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
