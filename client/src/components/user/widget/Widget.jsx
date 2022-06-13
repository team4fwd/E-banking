import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';
import { getData } from '../../../util/widgetData';
import './widget.scss';

const Widget = ({ type, amount }) => {
  const data = getData(type);

  return (
    <div className='widget'>
      <div className='widget__left'>
        <div className='widget__left-title'>{data.title}</div>
        <div className='widget__left-counter'>
          {data.isMoney ? `$${amount || 0}` : amount || 0}
        </div>
        {data.link && (
          <Link to={data.href}>
            <div className='widget__left-link'>{data.link}</div>
          </Link>
        )}
      </div>
      <div className='widget__right'>
        {data.isMoney ? (
          <div
            className={`widget__right-precentage ${
              data.increase ? 'positive' : 'negative'
            }`}
          >
            {data.increase ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
            {data.diff} %
          </div>
        ) : (
          <div></div>
        )}
        {data.icon}
      </div>
    </div>
  );
};
export default Widget;
