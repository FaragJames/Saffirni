import React, { useEffect } from "react";
import "./main.css";
import img1 from "../../assets/img.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaClipboardCheck } from "react-icons/fa6";
import Aos from "aos";
import "aos/dist/aos.css";

const Data = [
    {
        id: 1,
        imgsrc: img1,
        desTitel: "بورا بورا",
        location: "نيوزيلندا",
        grade: "استرخاء ثقافي",
        fees: "$700",
        description:
            "يُعتبر بورا بورا مثالاً للرومانسية، وهو أحد أفضل الوجهات السياحية.",
    },
    {
        id: 2,
        imgsrc: img2,
        desTitel: "بورا بورا",
        location: "نيوزيلندا",
        grade: "استرخاء ثقافي",
        fees: "$700",
        description:
            "يُعتبر بورا بورا مثالاً للرومانسية، وهو أحد أفضل الوجهات السياحية.",
    },
    {
        id: 3,
        imgsrc: img3,
        desTitel: "بورا بورا",
        location: "نيوزيلندا",
        grade: "استرخاء ثقافي",
        fees: "$700",
        description:
            "يُعتبر بورا بورا مثالاً للرومانسية، وهو أحد أفضل الوجهات السياحية.",
    },
    {
        id: 4,
        imgsrc: img4,
        desTitel: "بورا بورا",
        location: "نيوزيلندا",
        grade: "استرخاء ثقافي",
        fees: "$700",
        description:
            "يُعتبر بورا بورا مثالاً للرومانسية، وهو أحد أفضل الوجهات السياحية.",
    },
    {
        id: 5,
        imgsrc: img5,
        desTitel: "بورا بورا",
        location: "نيوزيلندا",
        grade: "استرخاء ثقافي",
        fees: "$700",
        description:
            "يُعتبر بورا بورا مثالاً للرومانسية، وهو أحد أفضل الوجهات السياحية.",
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
                    أكثر الوجهات زيارة
                </h3>
                <div className="seContent grid">
                    {Data.map(
                        ({
                            id,
                            imgsrc,
                            desTitel,
                            location,
                            grade,
                            fees,
                            description,
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
                                        <IoLocationOutline className="icon" />
                                        <span className="name">{location}</span>
                                    </span>
                                    <div className="fees flex">
                                        <div className="grade">
                                            <span>
                                                {grade}
                                                <small>+1</small>
                                            </span>
                                        </div>
                                        <div className="price">
                                            <h5>{fees}</h5>
                                        </div>
                                    </div>
                                    <div className="desc">
                                        <p>{description}</p>
                                        <button className="btn flex">
                                            التفاصيل{" "}
                                            <FaClipboardCheck className="icon" />
                                        </button>
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
