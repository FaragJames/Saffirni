import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashbord_components/Header";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'phoneNumber',
      width: 200,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', phoneNumber: 980238158 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNumber: 980238158 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', phoneNumber: 980238158 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', phoneNumber: 980238158 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phoneNumber: 980238158 },
    { id: 6, lastName: 'Melisandre', firstName: null, phoneNumber: 980238158 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phoneNumber: 980238158 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', phoneNumber: 980238158 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', phoneNumber: 980238158 },
  ];

const Trips = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header title={"الرحلات"} subTitle={""} />
      <button
        onClick={() => {
          navigate("/dashboard/AddTrip");
        }}
        className="btn"
        style={{
          border: "none",
          color: "#fff",
          marginBottom: "2rem",
          marginTop: "0.2rem",
          direction: "rtl",
        }}
      >
        <span>إضافة رحلة جديد</span>
      </button>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows} 
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </Box>
  );
};

export default Trips;
