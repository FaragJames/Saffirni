import { useEffect } from "react";
import "./main.css";
import Rating from '@mui/material/Rating';
import img1 from "../../assets/img.jpeg";
import img2 from "../../assets/img.jpeg";
import img3 from "../../assets/img.jpeg";
import img4 from "../../assets/img.jpeg";
import img5 from "../../assets/img.jpeg";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Aos from "aos";
import "aos/dist/aos.css";

const Data = [
    {
        id: 1,
        imgsrc: img1,
        desTitel: "شركة طرودة",
        Email:"terwada@gmail.com",
        Phone:"+963999999999",
        location1: "حلب ,0988888888",
        location2: "حمص ,0977777777",
        location3: "اللاذقية ,0966666666",
        Rrating:"5"
    },
    {
        id: 2,
        imgsrc: img2,
        desTitel: "شركة طرودة",
        Email:"terwada@gmail.com",
        Phone:"+963999999999",
        location1: "حلب ,0988888888",
        location2: "حمص ,0977777777",
        location3: "اللاذقية ,0966666666",
        Rrating:"4"
    },
    {
        id: 3,
        imgsrc: img3,
        desTitel: "شركة طرودة",
        Email:"terwada@gmail.com",
        Phone:"+963999999999",
        location1: "حلب ,0988888888",
        location2: "حمص ,0977777777",
        location3: "اللاذقية ,0966666666",
        Rrating:"3"
    },
    {
        id: 4,
        imgsrc: img4,
        desTitel: "شركة طرودة",
        Email:"terwada@gmail.com",
        Phone:"+963999999999",
        location1: "حلب ,0988888888",
        location2: "حمص ,0977777777",
        location3: "اللاذقية ,0966666666",
        Rrating:"2"
    },
    {
        id: 5,
        imgsrc: img5,
        desTitel: "شركة طرودة",
        Email:"terwada@gmail.com",
        Phone:"+963999999999",
        location1: "حلب ,0988888888",
        location2: "حمص ,0977777777",
        location3: "اللاذقية ,0966666666",
        Rrating:"1"
    },
];

const Main = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-up" className="title">
شركات النقل الأفضل </h3>
                <div className="seContent grid">
                    {Data.map(
                        ({
                            id,
                            imgsrc,
                            desTitel,
                            location1,
                            location2,
                            location3,
                            Rrating,
                            Email,
                            Phone,
                        
                        }) => (
                            <div
                                data-aos="fade-up"
                                key={id}
                                className="singleDestination"
                            >
                                <div className="imageDiv">
                                    <img src={imgsrc} alt={desTitel} />
                                </div>
                                <div className="cardInfo">
                                    <h4 className="desTital">{desTitel}</h4>
                                    <span className="continent flex">
                                        <EmailIcon className="icon" />
                                        <span className="name">{Email}</span>
                                    </span>
                                    <span className="continent flex">
                                        <PhoneIcon className="icon" />
                                        <span className="name">{Phone}</span>
                                    </span>
                                    <div className="continentlocation">
                                    <span className="continent flex">
                                        <LocationOnIcon className="icon" />
                                        <span className="name">{location1}</span>
                                    </span>
                                    <span className="continent flex">
                                        <LocationOnIcon className="icon" />
                                        <span className="name">{location2}</span>
                                    </span>
                                    <span className="continent flex">
                                        <LocationOnIcon className="icon" />
                                        <span className="name">{location3}</span>
                                    </span>
                                    </div>
                                   <div className="rating" style={{marginTop:"0.5rem" , marginBottom:"-0.5rem" , justifyContent:"center" , alignContent:"center"}}> 
                                   <Rating name="read-only" value={Rrating} readOnly />
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

export default Main;
