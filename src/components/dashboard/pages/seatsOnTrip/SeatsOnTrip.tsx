import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
        field: "seatNumber",
        headerName: "رقم المقعد",
        width: 90,
        editable: false,
    },
    {
        field: "seatStatus",
        headerName: "حالة المقعد",
        width: 100,
        editable: false,
    },
    {
        field: "travelerName",
        headerName: "اسم المسافر",
        width: 100,
        editable: false,
    },
    {
        field: "nationalID",
        headerName: "الرقم الوطني",
        width: 200,
        editable: false,
    },
    {
        field: "rating",
        headerName: "التقييم",
        width: 50,
        editable: false,
        type: "number",
    },
    { field: "comment", headerName: "تعليق", width: 200, editable: false },
    {
        field: "ُEditeseat",
        headerName: "تعديل معلومات المسافر",
        width: 150,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/dashboard/addtraveler")}
            >
            تعديل {" "}
          </Button>
        ),
      },
      {
        field: "DeletSeat",
        headerName: "حذف معلومات المسافر ",
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
        seatNumber: 1,
        seatStatus: "ممتلئ",
        travelerName: "أحمد",
        nationalID: "123456789",
        rating: 4,
        comment: "جيد",
    },
];

const SeatsOnTrip = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header title="معلومات مقاعد الرحلة" subTitle="" />
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/dashboard/addtraveler")}
                style={{
                    marginBottom: "2rem",
                    marginTop: "0.2rem",
                    direction: "rtl",
                }}
            >
                <span>إضافة مسافر</span>
            </Button>
            <Box sx={{ height: 400 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{ width: "100%", overflowX: "scroll" }}
                />
            </Box>
        </>
    );
};

export default SeatsOnTrip;
