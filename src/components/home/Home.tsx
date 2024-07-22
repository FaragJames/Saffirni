import { FormEvent } from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Main from "../main/Main";
import Bus from "../bus_layout/Bus";
import SearchForm from "../search_form/SearchForm";
import { useNavigate } from "react-router-dom";
import { fakeSeatsData } from "../../App";

export type SearchFormObject = {
  sourceStateId: number;
  destinationStateId: number;
  departTime: string;
  filters: Filters | null;
};
type Filters = {
  busTypeId: number;
  companyId: number;
  maxPrice: number;
};

export default function Home() {
  const navigate = useNavigate();

  
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
      filters: null,
    };

    navigate("/Trips", { state: { payload: payload } });
  }

  return (
    <>
      <Navbar />
      <SearchForm onSubmit={onSearchFormSubmit} />
      <Main />
      <Footer />
    </>
  );
}
