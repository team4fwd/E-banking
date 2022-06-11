import { useSelector } from 'react-redux';
import Alert from '../../components/Alert/Alert';
import DataTable from '../../components/user/dataTable/DataTable';
import './list.scss';

const List = () => {
  const { message } = useSelector((state) => state.accounts);

  return (
    <div className='list'>
      {message && (
        <Alert variant={message.status} msg={message.msg} re={message.id} />
      )}
      <DataTable />
    </div>
  );
};
export default List;
