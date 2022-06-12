export const rows = [
  {
    id: 1,
    account: 1143155,
    date: '1 March',
    type: 'Transfer',
    amount: 785,
  },
  {
    id: 2,
    account: 2235235,
    date: '1 March',
    type: 'Transfer',
    amount: 900,
  },
  {
    id: 3,
    account: 2342353,
    date: '1 March',
    type: 'Withdraw',
    amount: 35,
  },
  {
    id: 4,
    account: 2357741,
    date: '1 March',
    type: 'Recharge',
    amount: 920,
  },
  {
    id: 5,
    account: 2342355,
    date: '1 March',
    type: 'Recharge',
    amount: 2000,
  },
];

export const userColumns = [
  { field: 'id', headerName: 'Account Number', width: 300 },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 250,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 200,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
