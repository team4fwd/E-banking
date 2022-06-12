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

export const transactionColumns = [
  { field: 'id', headerName: 'ID', width: 240 },
  {
    field: 'accountNumber',
    headerName: 'Account Number',
    width: 250,
  },
  {
    field: 'type',
    headerName: 'Transaction',
    width: 130,
    renderCell: (params) => {
      return (
        <span style={{ color: params.row.kind === 'income' ? 'green' : 'red' }}>
          {params.row.type}
        </span>
      );
    },
  },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 150,
    renderCell: (params) => {
      return (
        <span style={{ color: params.row.kind === 'income' ? 'green' : 'red' }}>
          {params.row.amount}
        </span>
      );
    },
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 220,
  },
  {
    field: 'sender',
    headerName: 'Sender',
    width: 150,
  },
  {
    field: 'receiver',
    headerName: 'Receiver',
    width: 250,
  },
];
