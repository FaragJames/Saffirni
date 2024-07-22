import { useState } from 'react';
import { MdChair } from "react-icons/md";

// عرض المقعد الواحد
const Seat = ({ seatNumber, isSelected, isReserved, onClick }) => {
  let seatColor = 'grey';
  let cursorStyle = 'pointer';
 
  if (isSelected) {
    seatColor = 'green'; // مقعد محدد
  } else if (isReserved) {
    seatColor = 'red'; // مقعد محجوز
    cursorStyle = 'not-allowed'; // غير قابل للضغط

  }

  return (
    <>
    <MdChair style={{
        color: seatColor,
        width: '35px',
        height: '35px',
        margin: '5px',
        display: 'inline-block',
        cursor: cursorStyle,
        rotate:"-90deg",
          }}
          onClick={() => !isReserved && onClick(seatNumber)} />

    </>
    
    
  );
};

export default Seat;