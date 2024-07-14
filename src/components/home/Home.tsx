import { FormEvent } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import SearchForm from "../search_form/SearchForm";
import { useNavigate } from "react-router-dom";

export type SearchFormObject = {
    sourceStateId: number;
    destinationStateId: number;
    departTime: string;
};

export default function Home() {
    const navigate = useNavigate()
    function onSearchFormSubmit(e: FormEvent<HTMLFormElement>) {
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

        navigate("/Trips", { state: { payload: payload }})
    }

    return (
        <>
            <Navbar />
            <SearchForm onSubmit={onSearchFormSubmit} />
            <Footer />
        </>
    );
}
