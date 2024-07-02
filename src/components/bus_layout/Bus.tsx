import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seat from "../seat/Seat";
import "./bus.css";
import Footer from "../footer/Footer";
import { GiSteeringWheel } from "react-icons/gi";


const Bus = ({ seatsData, handleBusSubmit, handleUpdateFakeData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const numSelected = seatsData.map((seat) => {
      if (seat.selected)
        return seat.number;
      else 
        return '!';
    });
    const finalUpdated = numSelected.filter((sec) => sec !== '!');
    setSelectedSeats(finalUpdated);
  }, []);

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
    handleUpdateFakeData(seatNumber);
  };

  const handleNextClick = () => {
    handleBusSubmit(selectedSeats.length);
    navigate("/travelerInfo");  // الانتقال إلى صفحة MyTrips
  };

  return (
    <>
      <div className="busLayout">
        <h2 className="title">إختر مقاعد الجلوس</h2>
        <div className="busSeat">
        <GiSteeringWheel className="icon" />
        <div className="seatsContainer">

          {seatsData.map((seat, index) => (
            <div key={seat.number} className="seatWrapper">
              <Seat
                key={seat.number}
                seatNumber={seat.number}
                isSelected={selectedSeats.includes(seat.number)}
                isReserved={seat.reserved}
                onClick={() => handleSeatClick(seat.number)}
              />
            </div>
          ))}
        </div>
        </div>
        <div className="seatInfo">
          <p>المقاعد المحجوزة: {selectedSeats.length}</p>
          <p>المقاعد المحجوزة: {selectedSeats.join(", ")}</p>
        </div>
        <div className="buttonContainer">
          <button
            className="btn"
            onClick={handleNextClick}
          >
            <span>التالي</span>
          </button>
          <button
            className="btn"
            onClick={() => navigate('/')}
          >
            <span>العودة</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bus;
