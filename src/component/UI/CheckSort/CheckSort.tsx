import { useState } from 'react';
import { FaArrowUpWideShort, FaArrowDownShortWide } from 'react-icons/fa6';

interface Props {
  renderNews: any;
  setRenderNews: (valu: any) => void;
}

const CheckSort = ({ renderNews, setRenderNews }: Props) => {
  const [order, setOrder] = useState(true);

  const timeChange = () => {
    let result = [...renderNews]?.sort((a: any, b: any) => {
      let tempA = new Date(a.date).getTime();
      let tempB = new Date(b.date).getTime();
      if (order) {
        return tempA - tempB;
      } else {
        return tempB - tempA;
      }
    });
    setRenderNews(result);
    setOrder(!order);
  };

  return (
    <div
      className="d-flex align-items-center"
      style={{
        right: '0',
        cursor: 'pointer',
        fontSize: '20px',
        marginLeft: '10px',
      }}
      onClick={timeChange}
    >
      日期
      {order ? <FaArrowDownShortWide /> : <FaArrowUpWideShort />}
    </div>
  );
};

export default CheckSort;
