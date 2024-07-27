import { useLocation, useNavigate } from "react-router-dom";
import BusLayout from "../bus_layout/BusLayout";
import SeatsInput from "../seats_input/SeatsInput";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { UserContext } from "../../utilities/Contexts/UserContext";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

type TemporaryReservation = {
    reservationOwnerId: number;
    companyTripId: number;
    reservationSource: string;
    paymentMethod: string;
    busType: string;
    seatsNumbers: number[];
};
export type TemporaryReservationResponse = {
    reservationId: number;
    seatIdToSeatNumber: Map<number, number>;
};

export type LocationPayload = {
    companyTripId: number;
    busType: string;
    paymentMethod: string;
};

export default function SeatSelection() {
    const locationState = useLocation().state;
    const locationData = locationState
        ? (locationState as LocationPayload)
        : null;

    const [reservedSeats, setReservedSeats] = useState<number[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<number[]>>(
                        `/API/UserReservationSeat/GetReservedTripSeats/${locationData?.companyTripId}`
                    )
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    if (apiResponse.message) toast.success(apiResponse.message);

                    setReservedSeats(apiResponse.payload);
                    return;
                }

                apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }
        if (locationData) fetchData();
    }, []);

    const context = useContext(UserContext);
    const navigate = useNavigate();
    if (!locationData || !context.state.id) {
        toast.error("طلب خاطئ!");
        navigate("/Trips");
        return;
    }

    async function handleNextClick(seatsNumbers: number[]) {
        if (!locationData) return;

        const temporaryReservation: TemporaryReservation = {
            reservationOwnerId: context.state.id as number,
            companyTripId: locationData.companyTripId,
            reservationSource: "الموقع",
            paymentMethod: locationData.paymentMethod,
            busType: locationData.busType,
            seatsNumbers: seatsNumbers,
        };

        try {
            const apiResponse = (
                await apiClient.post<
                    GenericApiResponse<TemporaryReservationResponse>
                >(
                    "/API/UserTripReservation/CreateTemporaryReservation",
                    temporaryReservation
                )
            ).data;

            if (apiResponse.isSuccess) {
                if (apiResponse.message) toast.success(apiResponse.message);

                navigate("/Trip/TravelerInfo", { state: apiResponse.payload });
                return;
            }

            apiResponse.errors?.forEach((error) => toast.error(error));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {locationData.paymentMethod === "إلكتروني" ? (
                <BusLayout
                    handleNextClick={handleNextClick}
                    isVip={locationData.busType === "VIP"}
                    reservedSeats={reservedSeats}
                />
            ) : (
                <SeatsInput
                    handleNextClick={handleNextClick}
                    reservedSeats={reservedSeats}
                    totalSeats={locationData.busType === "VIP" ? 33 : 43}
                />
            )}
        </>
    );
}
