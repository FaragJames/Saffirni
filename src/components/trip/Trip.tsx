import React from 'react';

const Trip = ({ trip }) => {
  return (
    <div className="trip">
      
      <p>شركة النقل: {trip.carrier}</p>
      <p>نوع الرحلة: {trip.type}</p>
      <p>من: {trip.departureProvince} إلى: {trip.arrivalProvince}</p>
      <p>وقت الانطلاق: {trip.departureTime}</p>
      <p>وقت الوصول: {trip.arrivalTime}</p>
      <p>سعر التذكرة: {trip.price}</p>
      <p>عدد المقاعد المتبقية: {trip.availableSeats}</p>
      <button>حجز</button>
    </div>
  );
};

export default Trip;
