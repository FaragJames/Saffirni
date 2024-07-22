import { useLocation } from "react-router-dom";
import "./bill.css";
import Footer from "../footer/Footer";

const Bill = () => {
  const location = useLocation();
  const { flight, selectedSeats, travelers } = location.state || {};
  // if (!flight || !selectedSeats  ) {
  //     return <div>Error: Missing required data. Please go back and try again.</div>;
  //   }
  return (
    <>
      <div className="bill">
        <h2 className="title">تفاصيل الرحلة</h2>
        <div className="trip-info">
          <p>اسم الشركة: {flight?.airline}</p>
          <p>نوع الرحلة: {flight?.type}</p>
          <p>من: {flight?.from}</p>
          <p>إلى: {flight?.to}</p>
          <p>وقت الانطلاق: {flight?.departureTime}</p>
          <p>وقت الوصول المتوقع: {flight?.arrivalTime}</p>
          <p>عدد المقاعد المتبقية: {flight?.seatsAvailable}</p>
          <h5 className="price">{flight?.price} S.P</h5>
        </div>
        <h3 className="title">المقاعد المختارة</h3>
        <div className="seat-info">
          {/* <p>أرقام المقاعد: {selectedSeats?.join(", ")}</p> */}
          {travelers?.length > 0 &&
            travelers.map((traveler, index) => (
              <div key={index} className="traveler-info">
                <h4>كرسي رقم {selectedSeats[index]}</h4>
                <p>الإسم الكامل: {traveler?.fullName}</p>
                <p>الرقم الوطني: {traveler?.nationalNumber}</p>
              </div>
            ))}
        </div>
        <button className="btn">موافق</button>
      </div>
      <Footer />
    </>
  );
};

export default Bill;
