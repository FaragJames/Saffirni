import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashbord_components/Header";
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'SourceBusStation', headerName: 'نقطة الإنطلاق', width: 150, editable: true },
  { field: 'DestinationBusStation', headerName: 'الوجهة', width: 150, editable: true },
  { field: 'ExpectedDepartTime', headerName: 'وقت الإنطلاق المتوقع', width: 200, editable: true, type: 'dateTime' },
  { field: 'ActualDepartTime', headerName: 'وقت الوصول المتوقع', width: 200, editable: true, type: 'dateTime' },
  { field: 'ExpectedArrivalTime', headerName: 'وقت الإنطلاق الفعلي', width: 200, editable: true, type: 'dateTime' },
  { field: 'ActualArrivalTime', headerName: 'وقت الوصول الفعلي', width: 200, editable: true, type: 'dateTime' },
  { field: 'IsActive', headerName: 'مفعلة', width: 150, editable: true, type: 'boolean' },
  { field: 'TicketPrice', headerName: 'سعرالتذكرة', width: 150, editable: true, type: 'number' },
  {
    field: 'SeatsOfTrip', headerName: 'مقاعد الرحلة', width: 150,
    renderCell: (params) => (
      <Button variant="contained" color="primary" onClick={() => handleSeatsClick(params.row.id)}>عرض المقاعد</Button>
    )
  },
];

const rows = [
  { id: 1, SourceBusStation: 'Station A', DestinationBusStation: 'Station B', ExpectedDepartTime: dayjs('2023-06-29T08:30').toDate(), ActualDepartTime: dayjs('2023-06-29T08:45').toDate(), ExpectedArrivalTime: dayjs('2023-06-29T10:30').toDate(), ActualArrivalTime: dayjs('2023-06-29T10:45').toDate(), IsActive: true, TicketPrice: 50 },
  { id: 2, SourceBusStation: 'Station C', DestinationBusStation: 'Station D', ExpectedDepartTime: dayjs('2023-06-30T09:30').toDate(), ActualDepartTime: dayjs('2023-06-30T09:45').toDate(), ExpectedArrivalTime: dayjs('2023-06-30T11:30').toDate(), ActualArrivalTime: dayjs('2023-06-30T11:45').toDate(), IsActive: false, TicketPrice: 60 },
];

const Trips = () => {
  const navigate = useNavigate();

  const handleSeatsClick = (tripId) => {
    navigate(`/seats/${tripId}`);
  };

  return (
    <Box>
      <Header title={"الرحلات"} subTitle={""} />
      <Button variant="contained" color="primary" onClick={() => navigate("/dashboard/AddTrip")} style={{ marginBottom: "2rem", marginTop: "0.2rem", direction: "rtl" }}>
        <span>إضافة رحلة جديد</span>
      </Button>
      <Box sx={{ height: 400, width: '100%', overflowX: 'auto' }}>
        <DataGrid rows={rows} columns={columns} initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} pageSizeOptions={[5]} checkboxSelection disableRowSelectionOnClick />
      </Box>
    </Box>
  );
};

export default Trips;
