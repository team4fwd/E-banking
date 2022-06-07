import './chart.scss';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'January', Total: 400, Income: 600, Outcome: 200 },
  { name: 'February', Total: 2100, Income: 2800, Outcome: 700 },
  { name: 'March', Total: 800, Income: 1000, Outcome: 200 },
  { name: 'April', Total: 1600, Income: 1600, Outcome: 0 },
  { name: 'May', Total: 900, Income: 1700, Outcome: 800 },
  { name: 'June', Total: 1700, Income: 1700, Outcome: 0 },
];

const Chart = ({ aspect, title }) => {
  return (
    <div className='chart'>
      <div className='chart__title'>{title}</div>
      <ResponsiveContainer width='100%' aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='income' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='green' stopOpacity={0.8} />
              <stop offset='95%' stopColor='green' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='outcome' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='red' stopOpacity={0.8} />
              <stop offset='95%' stopColor='red' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke='gray' />
          <CartesianGrid strokeDasharray='3 3' className='chart__chartGrid' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Total'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#total)'
          />
          <Area
            type='monotone'
            dataKey='Income'
            stroke='green'
            fillOpacity={1}
            fill='url(#income)'
          />
          <Area
            type='monotone'
            dataKey='Outcome'
            stroke='red'
            fillOpacity={1}
            fill='url(#outcome)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
