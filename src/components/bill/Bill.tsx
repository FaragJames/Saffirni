import { useLocation, useNavigate } from "react-router-dom";
import "./bill.css";
import { BillItem } from "../traveler_info/TravelerInfo";
import { useEffect, useState } from "react";
import { ApiResponse, FilteredCompanyTrips, GenericApiResponse } from "../../utilities/Types";
import { apiClient } from "../../utilities/Axios";
import { toast } from "react-toastify";
import toArabicDateTime from "../../utilities/ArabicDateTime";

export default function Bill() {
    const location = useLocation().state;
    const billItems = location.billItems ? location.billItems as BillItem[] : null;
    const reservationId = location.reservationId ? location.reservationId as number : null;

    const [companyTripState, setCompanyTripState] = useState<FilteredCompanyTrips | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<
                        GenericApiResponse<FilteredCompanyTrips>
                    >(
                        `/API/UserTripReservation/GetReservationTripInfo/${reservationId}`
                    )
                ).data;
                if (apiResponse.isSuccess) {
                    setCompanyTripState(apiResponse.payload as FilteredCompanyTrips)
                    return;
                }

                apiResponse.errors?.forEach((error) => toast.error(error))
            } catch (error) {
                console.error(error)
            }
        }

        if(reservationId)
            fetchData();
    }, [])

    async function handleReservationSubmit() {
        try {
            const requestBody = billItems?.filter(billItem => billItem.createUser).map(billItem => billItem.travelerData);
            const noNeed = requestBody?.length === 0

            let createUsersResponse: ApiResponse | undefined = undefined;
            if(!noNeed) {
                createUsersResponse = (
                    await apiClient.post<ApiResponse>("/API/User/CreateUsers", requestBody)
                ).data;
              
                if(createUsersResponse.isSuccess) {
                    if(createUsersResponse.message)
                        toast.success(createUsersResponse.message);
                }
                else {
                    createUsersResponse.errors?.forEach((error) => toast.error(error));
                    return;
                }
            }

            if(noNeed || createUsersResponse?.isSuccess) {
                const seatIdToUserNationalId = Object.fromEntries(new Map(
                    billItems?.map((billItem) => [
                        billItem.seatId,
                        billItem.travelerData.nationalId,
                    ])
                ));
                const apiResponse = (
                    await apiClient.post<ApiResponse>(
                        "/API/UserTripReservation/ConfirmReservation",
                        { seatIdToUserNationalId, reservationId }
                    )
                ).data;

                if (apiResponse.isSuccess) {
                    if (apiResponse.message) toast.success(apiResponse.message);

                    navigate("/MyTrips");
                    return;
                }

                apiResponse.errors?.forEach((error) => toast.error(error));
            }

        } catch (error) {
            console.error(error)
        }
    }

    if(!billItems || !reservationId)
        return;

    return (
        <div className="bill">
            <h2 className="title">تفاصيل الرحلة</h2>
            <div className="trip-info">
                <p>اسم الشركة: {companyTripState?.companyName}</p>
                <p>نوع الرحلة: {companyTripState?.busType}</p>
                <p>من: {companyTripState?.source}</p>
                <p>إلى: {companyTripState?.destination}</p>
                <p>
                    وقت الانطلاق:{" "}
                    {toArabicDateTime(companyTripState?.expectedDepartTime)}
                </p>
                <p>
                    وقت الوصول المتوقع:{" "}
                    {toArabicDateTime(companyTripState?.expectedArrivalTime)}
                </p>
                <h5 className="price">{companyTripState?.ticketPrice} S.P</h5>
            </div>

            <h3 className="title">المقاعد المختارة</h3>
            <div className="seat-info">
                {billItems.map((billItem, index) => (
                    <div key={index} className="traveler-info">
                        <h4>كرسي رقم {billItem.seatNumber}</h4>
                        <p>الرقم الوطني: {billItem.travelerData.nationalId}</p>
                        {billItem.createUser && (
                            <>
                                <p>
                                    الاسم الكامل:{" "}
                                    {`${billItem.travelerData.firstName} ${billItem.travelerData.fatherName} ${billItem.travelerData.lastName}`}
                                </p>
                                <p>
                                    رقم الموبايل:{" "}
                                    {billItem.travelerData.phoneNumber}
                                </p>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <button className="btn" onClick={() => navigate(-1)}>
                العودة
            </button>
            <button className="btnG btn" onClick={handleReservationSubmit}>
                تثبيت الحجز
            </button>
        </div>
    );
}