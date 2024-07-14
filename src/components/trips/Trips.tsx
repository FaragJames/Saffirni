import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import SearchForm from "../search_form/SearchForm";
import { SearchFormObject } from "../home/Home";
import { FormEvent, useEffect, useState } from "react";
import { apiClient } from "../../utilities/Axios";
import { GenericApiResponse } from "../../utilities/Types";
import { toast } from "react-toastify";

export type FilteredCompanyTrips = {
    companyTripId: number;
    companyName: string;
    companyRating: number;
    source: string;
    destination: string;
    busType: string;
    ticketPrice: number;
    expectedDepartTime: Date;
    expectedArrivalTime: Date;
};

export default function Trips() {
    const locationState = useLocation().state as SearchFormObject | null;
    const [filteredCompanyTrips, setFilteredCompanyTrips] =
        useState<Array<FilteredCompanyTrips>>();

    useEffect(() => {
        async function fetchData() {
            try {
                const respones = await apiClient.post<
                    GenericApiResponse<Array<FilteredCompanyTrips>>
                >("/API/CompanyTrip/GetFilteredTrips", locationState);
                const apiResponse = respones.data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    if(apiResponse.message)
                        toast.success(apiResponse.message)
                    setFilteredCompanyTrips(apiResponse.payload);
                    return;
                }

                apiResponse.errors?.forEach((error) => {
                    toast.error(error);
                });
            } catch (error) {
                console.error(error)
            }
        }
        if (locationState) {
            fetchData()
        }
    }, []);

    async function onSearchFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const payload: SearchFormObject = {
            sourceStateId: parseInt(
                formData.get("sourceSelect")?.toString() as string
            ),
            destinationStateId: parseInt(
                formData.get("destinationSelect")?.toString() as string
            ),
            departTime: new Date(
                formData.get("dateInput")?.toString() as string
            ).toISOString(),
        };
    }

    return (
        <>
            <Navbar />
            <SearchForm onSubmit={onSearchFormSubmit} />
            <Footer />
        </>
    );
}
