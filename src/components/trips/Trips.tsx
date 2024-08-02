import { useLocation } from "react-router-dom";
import SearchForm from "../search_form/SearchForm";
import { SearchFormData } from "../home/Home";
import { FormEvent, useEffect, useRef, useState } from "react";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";
import SearchFilters from "../search_filters/SearchFilters";
import TripResult from "../trip_result/TripResult";
import { FilteredCompanyTrips } from "../../utilities/Types";

export default function Trips() {
    const locationState = useLocation().state;
    const locationData = locationState
        ? (locationState as SearchFormData)
        : null;

    const fullCompanyTrips = useRef<Array<FilteredCompanyTrips> | null>(null);
    const [filteredCompanyTrips, setFilteredCompanyTrips] =
        useState<Array<FilteredCompanyTrips> | null>(null);

    const busTypeId = useRef<number>(0);
    const companyId = useRef<number>(0);
    const maxPrice = useRef<number>(100000);
    const rating = useRef<number>(0);

    async function fetchData<T>(payload: T) {
        try {
            const response = await apiClient.post<
                GenericApiResponse<Array<FilteredCompanyTrips>>
            >("/API/CompanyTrip/GetFilteredTrips", payload);
            const apiResponse = response.data;

            fullCompanyTrips.current = apiResponse.payload;
            setFilteredCompanyTrips(apiResponse.payload);
            if (apiResponse.isSuccess && apiResponse.payload) {
                if (apiResponse.message) toast.success(apiResponse.message);
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
        if (locationData) fetchData(locationData);
    }, []);

    async function onSearchFormSubmit(e: FormEvent<HTMLFormElement>) {
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

        await fetchData(payload);
    }

    return (
        <>
            <SearchForm data={locationData} onSubmit={onSearchFormSubmit} />
            <div
                className="flex"
                style={{
                    direction: "ltr",
                    alignItems: "start",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
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
                        fullCompanyTrips={fullCompanyTrips.current}
                        setFilteredCompanyTrips={setFilteredCompanyTrips}
                    />
                </div>

                <div style={{ direction: "rtl" , margin:"auto"}}>
                    {!filteredCompanyTrips || filteredCompanyTrips.length === 0 ? (
                        <div style={
                        {marginRight:"3rem",marginTop:"5rem" , fontSize:"20px", fontWeight:"700"}
                        }>
                            لا توجد أية نتائج!
                        </div>
                    ) : (
                        <ul id="SearchTrip">
                        {filteredCompanyTrips?.map((companyTrip) => (
                            <li key={companyTrip.companyTripId}>
                                <TripResult companyTrip={companyTrip} />
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
        </>
    );
}
