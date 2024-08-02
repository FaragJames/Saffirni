import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
        field: "BusType",
        headerName: "نوع الحافلة",
        width: 150,
        editable: false,
    },
    {
        field: "plateNumber",
        headerName: "رقم اللوحة",
        width: 150,
        editable: false,
    },
    {
        field: "NumberOfSeats",
        headerName: "عدد المقاعد",
        width: 150,
        editable: false,
    },
    {
        field: "modelYear",
        headerName: "سنة الموديل",
        width: 150,
        editable: false,
    },
    {
        field: "ُEditeBuses",
        headerName: "تعديل باص",
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="success"
            onClick={() => handleViewSeats(params.row.id)}
          >
            تعديل {" "}
          </Button>
        ),
      },
      {
        field: "DeletBuses",
        headerName: "حذف باص ",
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleViewSeats(params.row.id)}
          >
            حذف {" "}
          </Button>
        ),
      },
];

const rows = [
    {
        id: 1,
        BusType: "Type A",
        plateNumber: "ABC123",
        NumberOfSeats: 50,
        modelYear: 2020,
    },
    {
        id: 2,
        BusType: "Type B",
        plateNumber: "DEF456",
        NumberOfSeats: 40,
        modelYear: 2019,
    },
    // Add more rows as needed
];

const Buses = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Header title={"الحافلات"} subTitle={""} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/dashboard/AddBus")}
                style={{
                    marginBottom: "2rem",
                    marginTop: "0.2rem",
                    direction: "rtl",
                }}
            >
                <span>إضافة حافلة جديدة</span>
            </Button>
            <Box sx={{ height: 400 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ width: "1250px", overflowX: "scroll" }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default Buses;
