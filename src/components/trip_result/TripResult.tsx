import { useNavigate } from "react-router-dom";
import "./TripResult.css";
import img from "../../assets/img.jpg";
import Rating from "@mui/material/Rating";
import { FilteredCompanyTrips } from "../../utilities/Types";
import { LocationPayload } from "../seat_selection/SeatSelection";
import { UserContext } from "../../utilities/Contexts/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import toArabicDateTime from "../../utilities/ArabicDateTime";

export default function TripResult(props: {
    companyTrip: FilteredCompanyTrips;
}) {
    const context = useContext(UserContext);
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
                <p>اسم الشركة: {props.companyTrip.companyName}</p>
                <p>نوع الرحلة: {props.companyTrip.busType}</p>
                <p>من: {props.companyTrip.source}</p>
                <p>إلى: {props.companyTrip.destination}</p>
            </div>
            
            <div className="Hresult2" >
                <p>
                    وقت الانطلاق:{" "}
                    {toArabicDateTime(props.companyTrip.expectedDepartTime)}
                </p>
                <p>
                    وقت الوصول المتوقع:{" "}
                    {toArabicDateTime(props.companyTrip.expectedArrivalTime)}
                </p>
                <p>عدد المقاعد الكلية: {props.companyTrip.totalSeats}</p>
                <p>عدد المقاعد المتبقية: {props.companyTrip.remainingSeats}</p>
            </div>
            
            <h5  className="price">{props.companyTrip.ticketPrice} S.P</h5>
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
            <button
                    className=" btnG btn1  flex"
                    onClick={() => {
                        if (!user) toast.error("يرجى تسجيل الدخول أولاً!");
                        else handleReserveClick("إلكتروني");
                    }}
                >
                    احجز و ادفع الآن
                </button>
                <button
                    className="btnR btn2  flex"
                    onClick={() => {
                        if (!user) toast.error("يرجى تسجيل الدخول أولاً!");
                        else handleReserveClick("مكتب الكراج");
                    }}
                >
                    احجز الآن بدون دفع
                </button>
        </div>
    );
}
