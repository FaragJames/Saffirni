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
                        driverId: values.driverId,
                        busId: values.busId,
                        trip: {
                            sourceBusStationId: parseInt(
                                values.sourceBusStationId
                            ),
                            destinationBusStationId: parseInt(
                                values.destinationBusStationId
                            ),
                        },
                        expectedArrivalTime: values.expectedArrivalTime,
                        expectedDepartTime: values.expectedDepartTime,
                        actualArrivalTime: values.actualArrivalTime,
                        actualDepartTime: values.actualDepartTime,
                        ticketPrice: values.ticketPrice,
                        isActive: Boolean(values.isActive),
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
