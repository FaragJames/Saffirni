import { Fragment, useContext, useEffect, useRef, useState } from "react";
import OneTrip from "../one_trip/OneTrip";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";
import { UserContext } from "../../utilities/Contexts/UserContext";
import { useNavigate } from "react-router-dom";

export type UserReservation = {
    reservationId: number;
    destination: string;
    expectedDepartTime: string;
    isReservationCompleted: boolean;
    isReviewable: boolean;
};

export default function MyTrips() {
    const [userReservationsState, setUserReservationsState] = useState<UserReservation[]>();
    const isCurrentReservationsRef = useRef<boolean>(true)

    const context = useContext(UserContext);
    const navigate = useNavigate();

    async function fetchData(currentReservations: boolean) {
        try {
            const apiResponse = (
                await apiClient.get<GenericApiResponse<UserReservation[]>>(
                    currentReservations
                        ? "/API/UserTripReservation/GetUserCurrentReservations"
                        : "/API/UserTripReservation/GetUserOldReservations"
                )
            ).data;

            if(apiResponse.isSuccess && apiResponse.payload) {
                isCurrentReservationsRef.current = currentReservations;
                setUserReservationsState(apiResponse.payload)
            }
            else
                apiResponse.errors?.forEach(error => toast.error(error))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(context.state.id)
            fetchData(true);
        else {
            toast.error("يرجى تسجيل الدخول أولاً!")
            navigate("/SignIn")
        }
    }, [context.state, navigate])

    return (
        <Fragment>
            <div style={{ paddingTop: "80px" }}>
                <div
                    style={{
                        margin: "2rem 2rem 1rem 2rem",
                        textAlign: "center",
                    }}
                >
                    <button
                        className="btn"
                        style={{
                            border: "none",
                            color: "#fff",
                            margin: "1rem 0.5rem",
                        }}
                        onClick={() => fetchData(true)}
                    >
                        رحلاتي الحالية
                    </button>
                    <button
                        className="btnR"
                        style={{
                            border: "none",
                            color: "#fff",
                            margin: "1rem 0.5rem",
                        }}
                        onClick={() => fetchData(false)}
                    >
                        رحلاتي السابقة
                    </button>
                </div>
                <div style={{justifyContent:"center"}}>
                {userReservationsState?.map((userReservation) => (
                    <OneTrip
                        key={userReservation.reservationId}
                        userReservation={userReservation}
                        isCurrentReservationsRef={isCurrentReservationsRef}
                        setUserReservationsState={setUserReservationsState}
                    />
                ))}
                </div>
              
            </div>
        </Fragment>
    );
}