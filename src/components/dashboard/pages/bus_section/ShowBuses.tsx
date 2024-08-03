import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { GenericApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { Bus, BusInfo } from "./BusSectionTypes";
import { handleDelete } from "../HandleDelete";

export default function ShowBuses() {
    const navigate = useNavigate();
    const [busesState, setBusesState] = useState<BusInfo[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<Bus[]>>("/API/Bus")
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    setBusesState(
                        apiResponse.payload.map<BusInfo>((bus) => {
                            return {
                                id: bus.id,
                                plateNumber: bus.plateNumber,
                                modelYear: bus.modelYear,
                                statusName: bus.busStatus.statusName,
                                numberOfSeats: bus.busType.numberOfSeats,
                                typeName: bus.busType.typeName,
                            };
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
        { field: "id", headerName: "ID", width: 90, editable: false },
        {
            field: "plateNumber",
            headerName: "رقم اللوحة",
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
            field: "typeName",
            headerName: "نوع الحافلة",
            width: 150,
            editable: false,
        },
        {
            field: "numberOfSeats",
            headerName: "عدد المقاعد",
            width: 150,
            editable: false,
        },
        {
            field: "statusName",
            headerName: "حالة الباص",
            width: 150,
            editable: false,
        },
        {
            field: "ُEditBuses",
            headerName: "تعديل باص",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                        navigate(`/Company/Dashboard/EditBus/${params.row.id}`, { state: params.row })
                    }
                >
                    تعديل{" "}
                </Button>
            ),
        },
        {
            field: "DeleteBuses",
            headerName: "حذف باص ",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(`/Api/Bus/${params.row.id}`)}
                >
                    حذف{" "}
                </Button>
            ),
        },
    ];

    return (
        <Box>
            <Header title={"الحافلات"} subTitle={""} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/Company/Dashboard/AddBus")}
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
                    rows={busesState}
                    columns={columns}
                    sx={{ width: "1250px", overflowX: "scroll" }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    // columnVisibilityModel={{
                    //     statusName: false
                    // }}
                />
            </Box>
        </Box>
    );
}
