import Header from "../../dashbord_components/Header";
import { Box, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 , editable: false },
  {
    field: 'firstName',
    headerName: 'الأسم الأول',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'الكنية',
    width: 150,
    editable: false,
  },
  {
    field: 'phoneNumber',
    headerName: 'رقم الجوال',
    width: 200,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'الإسم الكامل',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'البريد الإلكتروني',
    width: 250,
    editable: false,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', phoneNumber: 980238158, email: 'jon.snow@example.com' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', phoneNumber: 980238158, email: 'cersei.lannister@example.com' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', phoneNumber: 980238158, email: 'jaime.lannister@example.com' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', phoneNumber: 980238158, email: 'arya.stark@example.com' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', phoneNumber: 980238158, email: 'daenerys.targaryen@example.com' },
  { id: 6, lastName: 'Melisandre', firstName: null, phoneNumber: 980238158, email: 'melisandre@example.com' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', phoneNumber: 980238158, email: 'ferrara.clifford@example.com' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', phoneNumber: 980238158, email: 'rossini.frances@example.com' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', phoneNumber: 980238158, email: 'roxie.harvey@example.com' },
];

const Employees = () => {
  const navigate = useNavigate();
  
  return (
    <>
    <Header
              title="معلومات موظفين الشركة"
              subTitle=""
          />
      <Button variant="contained" color="primary" onClick={() => navigate("/dashboard/addemployee")} style={{ marginBottom: "2rem", marginTop: "0.2rem", direction: "rtl" }}>
      <span>إضافة موظف جديد</span>
      </Button>
    
<Box sx={{ height: 400 }}>
      <DataGrid
        rows={rows} 
        columns={columns}
        sx={{ width: '1250', overflowX : "scroll" }}
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
    </>

  );
};

export default Employees;
