import { useEffect, useState } from "react";
import "./main.css";
import Rating from "@mui/material/Rating";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Aos from "aos";
import "aos/dist/aos.css";
import ComImg from "../../assets/ComImg.png";
import { GenericApiResponse } from "../../utilities/Types";
import { apiClient } from "../../utilities/Axios";
import { toast } from "react-toastify";

type CompanyInfo = {
    id: number;
    name: string;
    email?: string;
    phoneNumber?: string;
    rating: number;
    companyBusStations: CompanyBusStationInfo[];
};

type CompanyBusStationInfo = {
    stateName: string;
    busStationName: string;
    companyOfficePhoneNumber?: string;
};

const Main = () => {
    const [companiesInfo, setCompaniesInfo] =
        useState<Array<CompanyInfo> | null>(null);
    useEffect(() => {
        Aos.init({ duration: 2000 });
        async function fetchData() {
            try {
                const apiResponse = (
                    await apiClient.get<GenericApiResponse<Array<CompanyInfo>>>(
                        "/API/Company/GetCompaniesInfo?fullInfo=true"
                    )
                ).data;

                if (apiResponse.isSuccess && apiResponse.payload) {
                    if (apiResponse.message) toast.success(apiResponse.message);

                    setCompaniesInfo(apiResponse.payload);
                    return;
                }

                apiResponse.errors?.forEach((error) => toast.error(error));
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-up" className="title">
                    شركات النقل الأفضل{" "}
                </h3>
                <div className="seContent grid">
                    {companiesInfo?.map((companyInfo) => (
                            <div
                                data-aos="fade-up"
                                key={companyInfo.id}
                                className="singleDestination"
                            >
                                <div className="imageDiv">
                                    <img src={ComImg} alt={companyInfo.name} />
                                </div>
                                <div className="cardInfo">
                                    <h4 className="desTital">
                                        {companyInfo.name}
                                    </h4>
                                    <span className="continent flex">
                                        <EmailIcon className="icon" />
                                        <span className="name">
                                            {companyInfo.email}
                                        </span>
                                    </span>
                                    <span className="continent flex">
                                        <PhoneIcon className="icon" />
                                        <span className="name">
                                            {companyInfo.phoneNumber}
                                        </span>
                                    </span>
                                    <div className="continentlocation">
                                        {companyInfo.companyBusStations.map(
                                            (companyBusStation) => (
                                                <span key={companyBusStation.companyOfficePhoneNumber} className="continent flex">
                                                    <LocationOnIcon className="icon" />
                                                    <span className="name">
                                                        {`${companyBusStation.stateName} - ${companyBusStation.busStationName}, ${companyBusStation.companyOfficePhoneNumber}`}
                                                    </span>
                                                </span>
                                            )
                                        )}
                                        <div
                                            className="rating"
                                            style={{
                                                width:"100%",
                                                marginTop: "0.5rem",
                                                marginBottom: "-0.5rem",
                                                textAlign:"center",
                                                borderTop:" 1.5px solid var(--greyText)"
                                                
                                            }}
                                        >
                                            <Rating
                                                name="read-only"
                                                value={companyInfo.rating}
                                                readOnly
                                                size="large"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default Main
