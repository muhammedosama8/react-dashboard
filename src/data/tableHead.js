export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "goodmanave",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "stevebower",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "aberdohnny",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "wootzifer",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "jackdower",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const productTable = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    flex: 2
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number"
  },
  {
    field: "img",
    headerName: "img"
  },
  {
      field: "brand",
      headerName: "Brand",
      flex: 1,
    },

  {
      field: "rating",
      headerName: "Rating",
      flex: 1,
    },
]

export const contactsTable = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "registrarId", headerName: "Registrar ID" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "phone",
    headerName: "Phone Number",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
  },
  {
    field: "zipCode",
    headerName: "Zip Code",
    flex: 1,
  },
];