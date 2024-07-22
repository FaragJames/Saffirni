import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import SearchForm from "../search_form/SearchForm";
import { SearchFormData } from "../home/Home";
import { FormEvent, useEffect, useRef, useState } from "react";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";
import SearchFilters from "../search_filters/SearchFilters";
import TripResult from "../trip_result/TripResult";

export type FilteredCompanyTrips = {
    companyTripId: number;
    companyName: string;
    companyRating: number;
    source: string;
    destination: string;
    busType: string;
    totalSeats: number;
    remainingSeats: number;
    ticketPrice: number;
    expectedDepartTime: string;
    expectedArrivalTime: string;
    actualDepartTime: string;
    actualArrivalTime: string;
};

export default function Trips() {
    const locationState = useLocation().state;
    const locationPayload = locationState
        ? (locationState.payload as SearchFormData)
        : null;

    const [filteredCompanyTrips, setFilteredCompanyTrips] =
        useState<Array<FilteredCompanyTrips>>();

    const busTypeId = useRef<number>(0);
    const companyId = useRef<number>(0);
    const maxPrice = useRef<number>(0);
    const rating = useRef<number>(0);

    async function fetchData<T>(payload: T) {
        try {
            const respones = await apiClient.post<
                GenericApiResponse<Array<FilteredCompanyTrips>>
            >("/API/CompanyTrip/GetFilteredTrips", payload);
            const apiResponse = respones.data;

            if (apiResponse.isSuccess && apiResponse.payload) {
                if (apiResponse.message) toast.success(apiResponse.message);

                setFilteredCompanyTrips(apiResponse.payload);
                return;
            }

            apiResponse.errors?.forEach((error) => {
                toast.error(error);
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (locationPayload) fetchData(locationPayload);
    }, []);

    function onSearchFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: SearchFormData = {
            sourceStateId: parseInt(
                formData.get("sourceSelect")?.toString() as string
            ),
            destinationStateId: parseInt(
                formData.get("destinationSelect")?.toString() as string
            ),
            departTime: new Date(
                formData.get("dateInput")?.toString() as string
            ).toISOString(),
            filters: {
                busTypeId: busTypeId.current,
                companyId: companyId.current,
                maxPrice: maxPrice.current,
                rating: rating.current,
            },
        };

        fetchData(payload);
    }

    return (
        <>
            <Navbar />
            <SearchForm data={locationPayload} onSubmit={onSearchFormSubmit} />
            <div
                className="flex"
                style={{
                    direction: "ltr",
                    alignItems: "start",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: "20rem",
                        direction: "rtl",
                        alignItems: "start",
                        paddingLeft: "2rem",
                    }}
                >
                    <SearchFilters
                        busTypeId={busTypeId}
                        companyId={companyId}
                        maxPrice={maxPrice}
                        rating={rating}
                    />
                </div>

                <div style={{ direction: "rtl" }}>
                    <ul id="SearchTrip">
                        {filteredCompanyTrips?.map((companyTrip) => (
                            <li key={companyTrip.companyTripId}>
                                <TripResult companyTrip={companyTrip} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}
