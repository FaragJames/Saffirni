import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashbord_components/Header";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'BusType', headerName: 'نوع الحافلة', width: 150, editable: true },
  { field: 'plateNumber', headerName: 'رقم اللوحة', width: 150, editable: true },
  { field: 'NumberOfSeats', headerName: 'عدد المقاعد', width: 150, editable: true },
  { field: 'modelYear', headerName: 'سنة الموديل', width: 150, editable: true },
];

const rows = [
  { id: 1, BusType: 'Type A', plateNumber: 'ABC123', NumberOfSeats: 50, modelYear: 2020 },
  { id: 2, BusType: 'Type B', plateNumber: 'DEF456', NumberOfSeats: 40, modelYear: 2019 },
  // Add more rows as needed
];

const Buses = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Header title={"الحافلات"} subTitle={""} />
      <Button variant="contained" color="primary" onClick={() => navigate("/dashboard/AddBus")} style={{ marginBottom: "2rem", marginTop: "0.2rem", direction: "rtl" }}>
        <span>إضافة حافلة جديدة</span>
      </Button>
      <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
        <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} pageSizeOptions={[5]} checkboxSelection disableRowSelectionOnClick />
      </Box>
    </Box>
  );
};

export default Buses;
