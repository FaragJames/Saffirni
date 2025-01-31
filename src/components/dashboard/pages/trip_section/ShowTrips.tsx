import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GenericApiResponse } from "../../../../utilities/Types";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { toast } from "react-toastify";
import toArabicDateTime from "../../../../utilities/ArabicDateTime";
import { DashboardCompanyTrips } from "./TripSectionTypes";
import { handleDelete } from "../HandleDelete";

export default function ShowTrips() {
    const navigate = useNavigate();
    const [dataState, setDataState] = useState<Array<DashboardCompanyTrips>>(
        []
    );

    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<
                        GenericApiResponse<DashboardCompanyTrips[]>
                    >("/API/CompanyTrip/GetAllDashboard")
                ).data;
                if (apiResponse.isSuccess && apiResponse.payload) {
                    const tmp = apiResponse.payload.map((value) => value);

                    setDataState(
                        tmp.map((value) => {
                            value.actualArrivalTime = toArabicDateTime(
                                value.actualArrivalTime
                            );
                            value.actualDepartTime = toArabicDateTime(
                                value.actualDepartTime
                            );
                            value.expectedArrivalTime = toArabicDateTime(
                                value.expectedArrivalTime
                            );
                            value.expectedDepartTime = toArabicDateTime(
                                value.expectedDepartTime
                            );
                            return value;
                        })
                    );
                } else
                    apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Id",
            width: 90,
            editable: false,
        },
        {
            field: "employeeId",
            headerName: "رقم الموظف",
            width: 90,
            editable: false,
        },
        {
            field: "driverId",
            headerName: "رقم السائق",
            width: 90,
            editable: false,
        },
        {
            field: "busId",
            headerName: "رقم الباص",
            width: 90,
            editable: false,
        },
        {
            field: "source",
            headerName: "نقطة الإنطلاق",
            width: 150,
            editable: false,
        },
        {
            field: "destination",
            headerName: "الوجهة",
            width: 150,
            editable: false,
        },
        {
            field: "expectedDepartTime",
            headerName: "وقت الإنطلاق المتوقع",
            width: 200,
            editable: false,
        },
        {
            field: "actualDepartTime",
            headerName: "وقت الوصول المتوقع",
            width: 200,
            editable: false,
        },
        {
            field: "expectedArrivalTime",
            headerName: "وقت الإنطلاق الفعلي",
            width: 200,
            editable: false,
        },
        {
            field: "actualArrivalTime",
            headerName: "وقت الوصول الفعلي",
            width: 200,
            editable: false,
        },
        {
            field: "isActive",
            headerName: "مفعلة",
            width: 150,
            editable: false,
            type: "boolean",
        },
        {
            field: "totalSeats",
            headerName: "عدد المقاعد الكلية",
            width: 150,
            editable: false,
        },
        {
            field: "remainingSeats",
            headerName: "عدد المقاعد المتبقية",
            width: 150,
            editable: false,
        },
        {
            field: "ticketPrice",
            headerName: "سعرالتذكرة",
            width: 150,
            editable: false,
        },
        {
            field: "SeatsOfTrip",
            headerName: "مقاعد الرحلة",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        navigate(`/Company/Dashboard/SeatsOnTrip`, {
                            state: params.row.id,
                        })
                    }
                >
                    عرض المقاعد
                </Button>
            ),
        },
        {
            field: "ُEditTrip",
            headerName: "تعديل الرحة",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                        navigate(`/Company/Dashboard/EditTrip/${params.row.id}`)
                    }
                >
                    تعديل{" "}
                </Button>
            ),
        },
        {
            field: "DeleteTrip",
            headerName: "حذف الرحلة ",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() =>
                        handleDelete(`/Api/CompanyTrip/${params.row.id}`)
                    }
                >
                    حذف{" "}
                </Button>
            ),
        },
    ];

    return (
        <Box>
            <Header title={"الرحلات"} subTitle={""} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/Company/Dashboard/AddTrip")}
                style={{
                    marginBottom: "2rem",
                    marginTop: "0.2rem",
                    direction: "rtl",
                }}
            >
                <span>إضافة رحلة جديد</span>
            </Button>
            <Box sx={{ height: 400 }}>
                <DataGrid
                    rows={dataState}
                    sx={{ width: "1250px", overflowX: "auto" }}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
}
