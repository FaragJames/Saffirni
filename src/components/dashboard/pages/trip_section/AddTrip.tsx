import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse } from "../../../../utilities/Types";
import { toast } from "react-toastify";
import { EmployeeContext } from "../../../../utilities/Contexts/EmployeeContext";
import { CompanyTripInfo } from "./TripSectionTypes";
import TripForm from "./TripForm";

export default function AddTrip() {
    const context = useContext(EmployeeContext);
    const navigate = useNavigate();

    async function handleSubmit(values: CompanyTripInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>(
                    "/API/CompanyTrip/AddDashboard",
                    {
                        employeeId: context.state.id,
                        driverId: values.DriverId,
                        busId: values.BusId,
                        trip: {
                            sourceBusStationId: parseInt(
                                values.SourceBusStationId
                            ),
                            destinationBusStationId: parseInt(
                                values.DestinationBusStationId
                            ),
                        },
                        expectedArrivalTime: values.ExpectedArrivalTime,
                        expectedDepartTime: values.ExpectedDepartTime,
                        actualArrivalTime: values.ActualArrivalTime,
                        actualDepartTime: values.ActualDepartTime,
                        ticketPrice: values.TicketPrice,
                        isActive: Boolean(values.IsActive),
                    }
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
            buttonLabel="إضافة"
            headerLabel="إضافة رحلة جديدة"
            editValues={undefined}
        />
    );
}
