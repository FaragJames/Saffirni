import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Seat from "../seat/Seat";
import "./bus.css";
import Footer from "../footer/Footer";
import { GiSteeringWheel } from "react-icons/gi";

const Bus = ({ seatsData = [], handleBusSubmit, handleUpdateFakeData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const lo = useLocation();
  let {flight}=lo.state;
  
 
  
  useEffect(() => {
    const numSelected = seatsData
      .filter((seat) => seat.selected)
      .map((seat) => seat.number);
    setSelectedSeats(numSelected);
    calculateTotalPrice(seatsData);  // Calculate initial total price
  }, [seatsData]);

  const handleSeatClick = (seatNumber) => {
    const updatedSeats = seatsData.map((seat) =>
      seat.number === seatNumber ? { ...seat, selected: !seat.selected } : seat
    );

    setSelectedSeats(
      updatedSeats.filter((seat) => seat.selected).map((seat) => seat.number)
    );
    handleUpdateFakeData(seatNumber);
    calculateTotalPrice(updatedSeats);
  };

  const handleNextClick = () => {
    console.log('handleNextClick called'); // Debugging statement
    console.log('Selected seats:', selectedSeats); // Debugging statement
    handleBusSubmit(selectedSeats);
    navigate("/travelerInfo", { state: { selectedSeats ,flight:flight} });  };

  const calculateTotalPrice = (seats) => {
    const selectedSeats = seats.filter((seat) => seat.selected);
    const price = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    setTotalPrice(price);
  };

  return (
    <>
      <div className="busLayout">
        <h2 className="title">إختر مقاعد الجلوس</h2>
        <div className="busSeat">
          <GiSteeringWheel className="icon" />
          <div className="seatsContainer">
            {seatsData.map((seat) => (
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
          <p>إجمالي السعر: {totalPrice} د.إ</p>
        </div>
        <div className="buttonContainer">
          <button className="btn" onClick={handleNextClick}>
            <span>التالي</span>
          </button>
          <button className="btn" onClick={() => navigate('/')}>
            <span>العودة</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bus;
