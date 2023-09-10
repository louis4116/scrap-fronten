import { v4 as uuidv4 } from 'uuid';
interface PaginationProps {
  length: number | undefined;
  current: number;
  number: number;
  setCurrent: (number: number) => void;
}

const Pagination = ({
  length,
  current,
  number,
  setCurrent,
}: PaginationProps) => {
  const pageNumbers = [];
  if (length) {
    for (let i = 1; i <= Math.ceil(length / number); i++) {
      pageNumbers.push(i);
    }
  }
  const nextPageHandler = () => {
    if (current >= pageNumbers.length) {
      console.log(current);
      return;
    } else {
      setCurrent(current + 1);
    }
  };
  const prePageHandler = () => {
    if (current <= 1) {
      return;
    } else {
      setCurrent(current - 1);
    }
  };
  return (
    <ul className="pagination" style={{ color: 'black' }}>
      <li className="page-item me-2">
        <button className="btn btn-outline-secondary" onClick={prePageHandler}>
          上一頁
        </button>
      </li>
      {pageNumbers?.map((item: any) => (
        <li key={uuidv4()} className="page-item mx-2">
          <button
            className={
              current === item
                ? 'btn btn-secondary'
                : 'btn btn-outline-secondary'
            }
            onClick={() => setCurrent(item)}
          >
            {item}
          </button>
        </li>
      ))}
      <li className="page-item ms-2">
        <button className="btn btn-outline-secondary" onClick={nextPageHandler}>
          下一頁
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
