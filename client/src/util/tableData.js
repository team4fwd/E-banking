export const rows = [
  {
    account: 1143155,
    date: '1 March',
    type: 'Transfer',
    amount: 785,
  },
  {
    account: 2235235,
    date: '1 March',
    type: 'Transfer',
    amount: 900,
  },
  {
    account: 2342353,
    date: '1 March',
    type: 'Withdraw',
    amount: 35,
  },
  {
    account: 2357741,
    date: '1 March',
    type: 'Recharge',
    amount: 920,
  },
  {
    account: 2342355,
    date: '1 March',
    type: 'Recharge',
    amount: 2000,
  },
];

export const userColumns = [
  { field: 'id', headerName: 'Account Number', width: 180, align: 'center' },
  // {
  //   field: 'user',
  //   headerName: 'User',
  //   width: 250,
  //   renderCell: (params) => {
  //         {params.row.username}
  //       </div>
  //     );
  //   },
  // },
  {
    field: 'balance',
    headerName: 'Balance',
    width: 250,
  },

  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   width: 130,
  // },
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

//temporary data
export const userRows = [
  {
    id: 1,
    status: 'active',
    balance: '100030409',
  },
  {
    id: 2,
    balance: '100030409',
    status: 'rejected',
  },
  {
    id: 3,
    balance: '100030409',
    status: 'pending',
  },
  {
    id: 4,
    balance: '100030409',
    status: 'active',
  },
  {
    id: 5,
    balance: '100030409',
    status: 'rejected',
  },
  {
    id: 6,
    balance: '100030409',
    status: 'active',
  },
  {
    id: 7,
    balance: '100030409',
    status: 'rejected',
  },
  {
    id: 8,
    balance: '100030409',
    status: 'active',
  },
  {
    id: 9,
    balance: '100030409',
    status: 'pending',
  },
  {
    id: 10,
    balance: '100030409',
    status: 'active',
  },
];
