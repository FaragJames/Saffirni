import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Seat from "../seat/Seat";
import "./bus.css";
import Footer from "../footer/Footer";
import { GiSteeringWheel } from "react-icons/gi";

const Bus = ({ seatsData = [], handleBusSubmit, handleUpdateFakeData }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedflight, setSelectedflight] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [updatedSeatsData, setUpdatedSeatsData] = useState(seatsData);
  const [showWarning, setShowWarning] = useState(false); // State for warning message
  const navigate = useNavigate();
  const lo = useLocation();
  let { flight } = lo.state;

  useEffect(() => {
    const numSelected = updatedSeatsData
      .filter((seat) => seat.selected)
      .map((seat) => seat.number);
    setSelectedSeats(numSelected);
    calculateTotalPrice(updatedSeatsData); // Calculate initial total price
  }, [updatedSeatsData]);

  const handleSeatClick = (seatNumber) => {
    const updatedSeats = updatedSeatsData.map((seat) =>
      seat.number === seatNumber ? { ...seat, selected: !seat.selected } : seat
    );

    setUpdatedSeatsData(updatedSeats);
    setSelectedSeats(
      updatedSeats.filter((seat) => seat.selected).map((seat) => seat.number)
    );
    calculateTotalPrice(updatedSeats);
  };

  const handleNextClick = () => {
    if (selectedSeats.length === 0) {
      setShowWarning(true);
      return;
    }

    console.log('handleNextClick called'); // Debugging statement
    console.log('Selected seats:', selectedSeats); // Debugging statement
    handleBusSubmit(selectedSeats);
    navigate("/travelerInfo", { state: { selectedSeats, flight } });
  };

  const calculateTotalPrice = (flight) => {
    const selectedflight = flight.filter((flight) => flight.selected);
    const price = selectedflight.reduce((total, flight) => total + flight.price, 0);
    setTotalPrice(price);
  };

  return (
    <>
      <div className="busLayout">
        <h2 className="title">إختر مقاعد الجلوس</h2>
        <div className="busSeat">
          <GiSteeringWheel className="icon" />
          <div className="seatsContainer">
            {updatedSeatsData.map((seat) => (
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
          <p>إجمالي السعر: {totalPrice} ل.س </p>
        </div>
        <div className="buttonContainer">
          <button
            className="btn"
            onClick={handleNextClick}
            disabled={selectedSeats.length === 0}
          >
            <span>التالي</span>
          </button>
          <button className="btn" onClick={() => navigate('/')}>
            <span>العودة</span>
          </button>
        </div>
        {showWarning && (
          <div className="warning">
            <p>الرجاء اختيار مقعد قبل المتابعة</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Bus;
