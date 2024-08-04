import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../dashboard_components/Header";
import { Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { GenericApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";

type TripSeatInfo = {
    id: number;
    reservationId: number;
    reservationOwnerName: string;
    seatOwnerName: string;
    seatNumber: number;
    seatStatusId: number;
    seatStatus: string;
};

export default function SeatsOnTrip() {
    const locationState = useLocation().state;
    const companyTripId = locationState ? (locationState as number) : null;

    const navigate = useNavigate();
    const columns: GridColDef[] = [
        { field: "id", headerName: "Id", width: 90, editable: false },
        {
            field: "reservationId",
            headerName: "رقم الحجز",
            width: 90,
            editable: false,
        },
        {
            field: "reservationOwnerName",
            headerName: "اسم صاحب الحجز",
            width: 90,
            editable: false,
        },
        {
            field: "seatOwnerName",
            headerName: "اسم المسافر",
            width: 90,
            editable: false,
        },
        {
            field: "seatNumber",
            headerName: "رقم المقعد",
            width: 90,
            editable: false,
        },
        {
            field: "seatStatusId",
            headerName: "Seat Status Id",
            width: 100,
            editable: false,
        },
        {
            field: "seatStatus",
            headerName: "حالة المقعد",
            width: 100,
            editable: false,
        },
        {
            field: "ُEditseat",
            headerName: "تعديل حالة المقعد",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                        navigate(`/Company/Dashboard/EditSeatStatus/${params.row.id}`, {
                            state: params.row.seatStatusId,
                        })
                    }
                >
                    تعديل{" "}
                </Button>
            ),
        },
    ];
    
    const [seatsState, setSeatsState] = useState<TripSeatInfo[]>([])
    useEffect(() => {
        async function fetchData() {
            const apiResponse = (
                await apiClient.get<GenericApiResponse<TripSeatInfo[]>>(
                    `/API/UserReservationSeat/GetTripSeatsDashboard/${companyTripId}`
                )
            ).data;

            if(apiResponse.isSuccess && apiResponse.payload)
                setSeatsState(apiResponse.payload)
            else
            apiResponse.errors?.forEach(error => toast.error(error))
        }

        if (!companyTripId) navigate(-1);
        else fetchData();
    }, []);

    if (!companyTripId) return null;

    return (
        <>
            <Header title="معلومات مقاعد الرحلة" subTitle="" />
            <Box sx={{ height: 650 }}>
                <DataGrid
                    rows={seatsState}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } },
                    }}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{ width: "100%", overflowX: "scroll" }}
                    columnVisibilityModel={{
                        seatStatusId: false,
                    }}
                />
            </Box>
        </>
    );
}
