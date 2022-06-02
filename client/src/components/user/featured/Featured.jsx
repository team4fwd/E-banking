import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  return (
    <div className='summary'>
      <div className='summary__top'>
        <h1 className='title'>Total Revenue</h1>
        <MoreVertIcon fontSize='small' />
      </div>
      <div className='summary__bottom'>
        <div className='summary__bottom-chart'>
          <CircularProgressbar value={70} text={`70%`} strokeWidth={5} />
        </div>
        <p className='summary__bottom-title'>Total sales made today</p>
        <p className='summary__bottom-amount'>$420</p>
        <p className='summary__bottom-desc'>
          Previous transactions processing. Last Payments may not be included.
        </p>
        <div className='summary__bottom-summary'>
          <div className='item'>
            <div className='item-title'>Target</div>
            <div className='item-result positive'>
              <KeyboardArrowUpIcon fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last Month</div>
            <div className='item-result negative'>
              <KeyboardArrowDownIcon fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
          <div className='item'>
            <div className='item-title'>Last Week</div>
            <div className='item-result positive'>
              <KeyboardArrowUpIcon fontSize='small' />
              <div className='result-amount'>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
