import { useEffect, useState, useRef, FormEvent } from "react";
import "./SearchForm.css";
import { GrLocation } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import video from "../../assets/video.mp4";
import Aos from "aos";
import "aos/dist/aos.css";
import { apiClient } from "../../App";
import { GenericApiResponse } from "../../utilities/Types";
import { useNavigate } from "react-router";

type State = {
    id: number;
    name: string;
};

export default function SearchForm(props: { isHomePage:boolean }) {
    //const navigate = useNavigate();
    const states = useRef<Array<State>>([{ id: 0, name: "" }]);
    useEffect(() => {
        Aos.init({ duration: 2000 });
        async function fetchData() {
            const response = await apiClient.get<
                GenericApiResponse<Array<State>>
            >("/Api/States");
            const apiResponse = response.data;

            if (apiResponse.isSuccess)
                states.current = apiResponse.payload as Array<State>;
        }

        fetchData();
    }, []);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(props.isHomePage){
            //navigate("Trips")
            //return;
        }
        const payload = {
            sourceStateId: parseInt(
                formData.get("sourceSelect")?.toString() as string
            ),
            destinationStateId: parseInt(
                formData.get("destinationSelect")?.toString() as string
            ),
            departTime: new Date(
                formData.get("dateInput")?.toString() as string
            ),
        };

        const response = await apiClient.post("/", payload);
    };
    return (
        <section className="home" style={{ direction: "rtl" }}>
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop></video>
            <div className="homeContent container">
                <div className="textDiv">
                    <h1 data-aos="fade-up" className="homeTitel">
                        ابحث عن رحلتك
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div data-aos="fade-up" className="cardDiv grid">
                        <div className={`disInput `}>
                            <label htmlFor="city">نقطة الانطلاق</label>
                            <div className="input flex">
                                <select
                                    id="departureProvince"
                                    className="provinceSelect"
                                    name="sourceSelect"
                                    required
                                >
                                    <option value="" disabled selected>
                                        اختر محافظة
                                    </option>
                                    {states.current.map((state) => (
                                        <option key={state.id} value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                <GrLocation className="icon" />
                            </div>
                        </div>
                        <div className="disInput">
                            <label htmlFor="city">الوجهة</label>
                            <div className="input flex">
                                <select
                                    id="arrivalProvince"
                                    className="provinceSelect"
                                    name="destinationSelect"
                                    required
                                >
                                    <option value="" disabled selected>
                                        اختر محافظة
                                    </option>
                                    {states.current.map((state) => (
                                        <option key={state.id} value={state.id}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                <GrLocation className="icon" />
                            </div>
                        </div>
                        <div className="dataInput">
                            <label htmlFor="city">موعد الرحلة</label>
                            <div className="input flex">
                                <input
                                    type="date"
                                    id="dateInput"
                                    name="dateInput"
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            className="searchOptions flex"
                            style={{ border: "none", color: "#fff" }}
                            type="submit"
                        >
                            <span>ابحث</span>
                            <FaSearch className="icon" color="#fff" />
                        </button>
                    </div>
                </form>
                <div data-aos="fade-up" className="homeFooterIcons flex"></div>
            </div>
        </section>
    );
}
