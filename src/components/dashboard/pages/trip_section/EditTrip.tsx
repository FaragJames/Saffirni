import { toast } from "react-toastify";
import { apiClient } from "../../../../utilities/Axios";
import {
    ApiResponse,
    EditRouteParams,
    GenericApiResponse,
    PatchRequest,
} from "../../../../utilities/Types";
import { CompanyTripInfo } from "./TripSectionTypes";
import TripForm from "./TripForm";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditTrip() {
    const params = useParams<EditRouteParams>();
    const navigate = useNavigate();
    const [tripState, setTripState] = useState<CompanyTripInfo>();

    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<any>>(
                        `/API/CompanyTrip/GetOneDashboard/${params.id}`
                    )
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    const tmp: CompanyTripInfo = {
                        ticketPrice: apiResponse.payload.ticketPrice,
                        sourceBusStationId:
                            apiResponse.payload.trip.sourceBusStationId,
                        destinationBusStationId:
                            apiResponse.payload.trip.destinationBusStationId,
                        expectedDepartTime:
                            apiResponse.payload.expectedDepartTime,
                        expectedArrivalTime:
                            apiResponse.payload.expectedArrivalTime,
                        actualDepartTime: apiResponse.payload.actualDepartTime,
                        actualArrivalTime:
                            apiResponse.payload.actualArrivalTime,
                        driverId: apiResponse.payload.driverId,
                        busId: apiResponse.payload.busId,
                        isActive: apiResponse.payload.isActive,
                    };
                    setTripState(tmp);
                } else
                    apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }

        if (!params.id) navigate(-1);
        else fetchData();
    }, []);

    if (!params.id) return;

    async function handleSubmit(values: CompanyTripInfo) {
        try {
            const request: PatchRequest[] = [];
            if (
                values.actualArrivalTime &&
                values.actualArrivalTime !== tripState?.actualArrivalTime
            )
                request.push({
                    op: "replace",
                    path: "ActualArrivalTime",
                    value: values.actualArrivalTime,
                });
            if (
                values.actualDepartTime &&
                values.actualDepartTime !== tripState?.actualDepartTime
            )
                request.push({
                    op: "replace",
                    path: "ActualDepartTime",
                    value: values.actualDepartTime,
                });
            if (values.expectedArrivalTime !== tripState?.expectedArrivalTime)
                request.push({
                    op: "replace",
                    path: "ExpectedArrivalTime",
                    value: values.expectedArrivalTime,
                });
            if (values.expectedDepartTime !== tripState?.expectedDepartTime)
                request.push({
                    op: "replace",
                    path: "ExpectedDepartTime",
                    value: values.expectedDepartTime,
                });
            if (values.busId !== tripState?.busId)
                request.push({
                    op: "replace",
                    path: "BusId",
                    value: values.busId.toString(),
                });
            if (values.driverId !== tripState?.driverId)
                request.push({
                    op: "replace",
                    path: "DriverId",
                    value: values.driverId.toString(),
                });
            if (
                values.destinationBusStationId !==
                tripState?.destinationBusStationId
            )
                request.push({
                    op: "replace",
                    path: "/Trip/DestinationBusStationId",
                    value: values.destinationBusStationId,
                });
            if (values.sourceBusStationId !== tripState?.sourceBusStationId)
                request.push({
                    op: "replace",
                    path: "/Trip/SourceBusStationId",
                    value: values.sourceBusStationId,
                });
            if (values.isActive !== tripState?.isActive)
                request.push({
                    op: "replace",
                    path: "IsActive",
                    value: values.isActive,
                });
            if (values.ticketPrice !== tripState?.ticketPrice)
                request.push({
                    op: "replace",
                    path: "TicketPrice",
                    value: values.ticketPrice.toString(),
                });

            if (request.length === 0) {
                toast.info("ليست هنالك أية تغييرات.");
                return;
            }
            const apiResponse = (
                await apiClient.patch<ApiResponse>(
                    `/API/CompanyTrip/${params.id}`,
                    request
                )
            ).data;
            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);

                navigate("/Company/Dashboard");
                return;
            }

            apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TripForm
            handleSubmit={handleSubmit}
            buttonLabel="تعديل"
            headerLabel="تعديل رحلة"
            editValues={tripState}
        />
    );
}
