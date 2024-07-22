import { useState } from 'react';
import { MdChair } from "react-icons/md";

// عرض المقعد الواحد
const Seat = ({ seatNumber, isSelected, isReserved, onClick }) => {
  let seatColor = 'gray';
  let cursorStyle = 'pointer';
 
  if (isSelected) {
    seatColor = 'green'; // مقعد محدد
  } else if (isReserved) {
    seatColor = 'red'; // مقعد محجوز
    cursorStyle = 'not-allowed'; // غير قابل للضغط

  }

  return (
    <>
    {/* <div
      style={{
        backgroundColor: seatColor,
        width: '50px',
        height: '50px',
        border: '1px solid #000',
        margin: '5px',
        display: 'inline-block',
        cursor: cursorStyle,
          }}
          onClick={() => !isReserved && onClick(seatNumber)} // السماح بالضغط إذا لم يكن المقعد محجوز
          >
      {seatNumber}
    </div> */}
    <MdChair style={{
        color: seatColor,
        width: '25px',
        height: '25px',
        margin: '5px',
        display: 'inline-block',
        cursor: cursorStyle,
          }}
          onClick={() => !isReserved && onClick(seatNumber)} />

    </>
    
    
  );
};

export default Seat;