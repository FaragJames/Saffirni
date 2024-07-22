import React, { Fragment } from "react";
import { useState } from "react";
import OneTrip from "../one_trip/OneTrip";
import { useEffect } from "react";
import { Padding } from "@mui/icons-material";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
const tripsData = [
    {
        id: 1,
        departureTime: "08:00 AM",
        arrivalTime: "12:00 PM",
        seatsAvailable: 10,
        price: 5000,
        airline: "Airline A",
        type: "Direct",
        from: "City A",
        to: "City B",
    },
    {
        id: 2,
        departureTime: "09:00 AM",
        arrivalTime: "01:00 PM",
        seatsAvailable: 5,
        price: 6000,
        airline: "Airline B",
        type: "Connecting",
        from: "City C",
        to: "City D",
    },
];

const handleDelete = (id) => {
    console.log(`Trip with id ${id} deleted`);
};

const MyTrips = () => {
    return (
        <Fragment>
            <Navbar />
            <div style={{ paddingTop: "80px" }}>
            <div style={{margin:"2rem 2rem 1rem 2rem", textAlign:"center"}}>
            <button className="btn" style={{ border: "none", color: "#fff", margin: "1rem 0.5rem"}} >رحلاتي الحالية</button>
            <button className="btn" style={{ border: "none", color: "#fff", margin: "1rem 0.5rem"}} >رحلاتي السابقة</button>
            </div>
            
                {tripsData.map((trip) => (
                    <OneTrip
                        key={trip.id}
                        trip={trip}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <Footer />
        </Fragment>
    );
};
export default MyTrips;
