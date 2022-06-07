import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

export const getData = (type) => {
  switch (type) {
    case 'accounts':
      return {
        title: 'ACCOUNTS',
        increase: false,
        isMoney: false,
        link: 'See all accounts',
        href: '/accounts',
        amount: 3,
        diff: 20,
        icon: (
          <PersonOutlinedIcon
            className='icon'
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      };
    case 'balance':
      return {
        title: 'TOTAL BALANCE',
        increase: true,
        isMoney: true,
        link: 'See details',
        href: '/accounts',
        amount: 8000000,
        diff: 20,
        icon: (
          <MonetizationOnOutlinedIcon
            className='icon'
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      };
    case 'income':
      return {
        title: 'INCOME',
        increase: true,
        isMoney: true,
        link: 'See details',
        href: '/accounts',
        amount: 50000,
        diff: 30,
        icon: (
          <MonetizationOnOutlinedIcon
            className='icon'
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        ),
      };
    case 'outcome':
      return {
        title: 'OUTCOME',
        increase: false,
        isMoney: true,
        link: 'See details',
        href: '/accounts',
        amount: 10000,
        diff: 20,
        icon: (
          <MonetizationOnOutlinedIcon
            className='icon'
            style={{
              backgroundColor: 'rgba(270, 0, 128, 0.2)',
              color: 'crimson',
            }}
          />
        ),
      };
    default:
      return {};
  }
};
