// import { useEffect, useState, useRef } from "react";
// import "./home.css";
// import { GrLocation } from "react-icons/gr";
// import { FiFacebook } from "react-icons/fi";
// import { FaInstagram } from "react-icons/fa";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaListUl } from "react-icons/fa";
// import { TbApps } from "react-icons/tb";
// import { FaSearch } from "react-icons/fa";
// import video from "../../assets/video.mp4";
// import Aos from "aos";
// import "aos/dist/aos.css";

// type ParamsType = {
//     setClickSubmitting(): void
// };

// const Home = (params: ParamsType) => {
//     const [check, setCheck] = useState(false);
//     const refInput = useRef();

//     useEffect(() => {
//         Aos.init({ duration: 2000 });
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         params.setClickSubmitting();
//         const targetElement = document.getElementById("SearchTrip");
//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: "smooth" });
//         }
//     };

//     const today = new Date();
//     const [selectedDate, setSelectedDate] = useState(
//         today.toISOString().split("T")[0]
//     );

//     const handleDateChange = (event) => {
//         setSelectedDate(event.target.value);
//     };

//     const provinces = ["دمشق", "حلب", "حمص", "اللاذقية"];
//     const [departureProvince, setDepartureProvince] = useState("");
//     const [arrivalProvince, setArrivalProvince] = useState("");

//     return (
//         <section className="home" style={{ direction: "rtl" }}>
//             <div className="overlay"></div>
//             <video src={video} muted autoPlay loop type="video/mp4"></video>
//             <div className="homeContent container">
//                 <div className="textDiv">
//                     <h1 data-aos="fade-up" className="homeTitel">
//                         ابحث عن رحلتك
//                     </h1>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div data-aos="fade-up" className="cardDiv grid">
//                         <div className={`disInput `}>
//                             <label htmlFor="city">اختر نقطة الإنطلاق</label>
//                             <div
//                                 className={`input flex ${check ? "error" : ""}`}
//                             >
//                                 <select
//                                     id="departureProvince"
//                                     className="provinceSelect"
//                                     value={departureProvince}
//                                     onChange={(e) =>
//                                         setDepartureProvince(e.target.value)
//                                     }
//                                 >
//                                     <option value="">--</option>
//                                     {provinces.map((province) => (
//                                         <option key={province} value={province}>
//                                             {province}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <GrLocation className="icon" />
//                             </div>
//                         </div>
//                         <div className="disInput">
//                             <label htmlFor="city">اختر الوجهة</label>
//                             <div className="input flex">
//                                 <select
//                                     id="arrivalProvince"
//                                     className="provinceSelect"
//                                     value={arrivalProvince}
//                                     onChange={(e) =>
//                                         setArrivalProvince(e.target.value)
//                                     }
//                                 >
//                                     <option value="">--</option>
//                                     {provinces.map((province) => (
//                                         <option key={province} value={province}>
//                                             {province}
//                                         </option>
//                                     ))}
//                                 </select>
//                                 <GrLocation className="icon" />
//                             </div>
//                         </div>
//                         <div className="dataInput">
//                             <label htmlFor="city">اختر موعد الرحلة</label>
//                             <div className="input flex">
//                                 <input
//                                     type="date"
//                                     id="futureDate"
//                                     value={selectedDate}
//                                     min={today.toISOString().split("T")[0]}
//                                     onChange={handleDateChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <button
//                             className="searchOptions btn flex"
//                             style={{ border: "none", color: "#fff" }}
//                             type="submit"
//                         >
//                            ابحث 
//                             <FaSearch className="icon" color="#fff" />
//                         </button>
//                     </div>
//                 </form>
//                 <div data-aos="fade-up" className="homeFooterIcons flex">
//                     <div className="rightIcons">
//                         <FiFacebook className="icon" />
//                         <FaInstagram className="icon" />
//                         <FaWhatsapp className="icon" />
//                     </div>
//                     <div className="leftIcons">
//                         <FaListUl className="icon" />
//                         <TbApps className="icon" />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Home;
