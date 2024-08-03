import { toast } from "react-toastify";
import { apiClient } from "../../../../utilities/Axios";
import { ApiResponse } from "../../../../utilities/Types";
import { CompanyTripInfo } from "./TripSectionTypes";
import TripForm from "./TripForm";

export default function EditTrip() {
    const context = useContext(EmployeeContext);
    const navigate = useNavigate();

    async function handleSubmit(values: CompanyTripInfo) {
        try {
            const apiResponse = (
                await apiClient.post<ApiResponse>(
                    "???",
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

    return <TripForm handleSubmit={handleSubmit} buttonLabel="تعديل" />;
}