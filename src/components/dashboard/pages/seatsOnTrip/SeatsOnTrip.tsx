import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 90, editable: false },
    {
        field: "seatNumber",
        headerName: "رقم المقعد",
        width: 150,
        editable: false,
    },
    {
        field: "seatStatus",
        headerName: "حالة المقعد",
        width: 150,
        editable: false,
    },
    {
        field: "travelerName",
        headerName: "اسم المسافر",
        width: 200,
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
        width: 150,
        editable: false,
        type: "number",
    },
    { field: "comment", headerName: "تعليق", width: 300, editable: false },
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
    // أضف المزيد من البيانات التجريبية هنا
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
