import React, { useState } from "react";
import TripResults from "../trip_results/TripResults";

const fakeSearchResults = [
    {
      idsearch: 1,
      airline: 'شركة النقل الأولى',
      type: 'رحلة داخلية',
      from: 'دمشق',
      to: 'حلب',
      departureTime: '09:00 صباحًا',
      arrivalTime: '10:00 صباحًا',
      price: 100,
      seatsAvailable: 50,
    },
    {
        idsearch: 2,
      airline: 'شركة النقل الثانية',
      type: 'رحلة دولية',
      from: 'حلب',
      to: 'اللاذقية',
      departureTime: '01:00 مساءً',
      arrivalTime: '03:00 مساءً',
      price: 150,
      seatsAvailable: 30,
    },
];

const SearchTrip = ({ clickSubmitting }) => {
    const [searchResults, setSearchResults] = useState(fakeSearchResults);

    return (
        <div id="SearchTrip">
            {clickSubmitting && searchResults.map((flight) => (

                 
                
                <TripResults key={flight.idsearch} flight={flight} />
            ))}
        </div>
    );
};

export default SearchTrip;
