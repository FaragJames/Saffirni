import { FormEvent } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Main from "../main/Main";
import SearchForm from "../search_form/SearchForm";
import { useNavigate } from "react-router-dom";

export type SearchFormData = {
    sourceStateId: number;
    destinationStateId: number;
    departTime: string;
    filters: Filters | null;
};
type Filters = {
    busTypeId: number;
    companyId: number;
    maxPrice: number;
    rating: number;
};

export default function Home() {
    const navigate = useNavigate();

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
            filters: null,
        };

        navigate("/Trips", { state: { payload: payload } });
    }

    return (
        <>
            <Navbar />
            <SearchForm data={null} onSubmit={onSearchFormSubmit} />
            <Main />
            <Footer />
            
        </>
    );
}
