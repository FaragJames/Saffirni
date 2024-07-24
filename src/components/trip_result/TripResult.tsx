import { useNavigate } from "react-router-dom";
import "./TripResult.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import { FilteredCompanyTrips } from "../../utilities/Types";
import { LocationPayload } from "../seat_selection/SeatSelection";
import { DataContext } from "../../utilities/Context";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function TripResult(props: {
    companyTrip: FilteredCompanyTrips;
}) {
    const context = useContext(DataContext);
    const navigate = useNavigate();
    const handleReserveClick = (paymentMethod: string) => {
        const payload: LocationPayload = {
            paymentMethod: paymentMethod,
            companyTripId: props.companyTrip.companyTripId,
            busType: props.companyTrip.busType,
        };
        navigate("/Trip/SeatSelection", { state: payload });
    };
    const user = context.state.id ? context.state : null;

    return (
        <div className="flight-result">
            <div className="Hresult">
                <p>
                    وقت الانطلاق:{" "}
                    {new Date(
                        props.companyTrip.expectedDepartTime
                    ).toLocaleString("ar", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </p>
                <p>
                    وقت الوصول المتوقع:{" "}
                    {new Date(
                        props.companyTrip.expectedArrivalTime
                    ).toLocaleString("ar", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </p>
                <p>عدد المقاعد الكلية: {props.companyTrip.totalSeats}</p>
                <p>عدد المقاعد المتبقية: {props.companyTrip.remainingSeats}</p>
                <h5 className="price">{props.companyTrip.ticketPrice} S.P</h5>
            </div>
            <div className="Hresult">
                <p>اسم الشركة: {props.companyTrip.companyName}</p>
                <p>نوع الرحلة: {props.companyTrip.busType}</p>
                <p>من: {props.companyTrip.source}</p>
                <p>إلى: {props.companyTrip.destination}</p>
            </div>
            <div className="imresalt">
                <div className="imageDiv">
                    <img src={img} />
                </div>
                <Rating
                    dir="ltr"
                    name="half-rating-read"
                    defaultValue={props.companyTrip.companyRating}
                    precision={0.1}
                    readOnly
                />
                <span>{props.companyTrip.companyRating}</span>
            </div>
            <div>
                <button
                    className="btn  flex"
                    onClick={() => {
                        if (!user) toast.error("يرجى تسجيل الدخول أولاً!");
                        else handleReserveClick("إلكتروني");
                    }}
                >
                    احجز و ادفع الآن
                </button>
                <button
                    className="btn  flex"
                    onClick={() => {
                        if (!user) toast.error("يرجى تسجيل الدخول أولاً!");
                        else handleReserveClick("مكتب الكراج");
                    }}
                >
                    احجز الآن بدون دفع
                </button>
            </div>
        </div>
    );
}
