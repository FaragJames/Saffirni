import React, { useEffect } from "react";
import "./footer.css";
import video from "../../assets/video.mp4";
import { FiSend } from "react-icons/fi";
import { MdTravelExplore } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import MainIcon from "../../assets/tour and travel.svg";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);

    return (
        <section className="footer" style={{ direction: "rtl" }}>
            <div className="videoDiv">
                <video src={video} loop autoPlay muted type="video/mp4"></video>
            </div>
            <div className="secContent container">
                <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>KEEP ON TOUCH</small>
                        <h2>Travel with us</h2>
                    </div>
                    <div className="inputDiv flex">
                        <input
                            data-aos="fade-up"
                            type="text"
                            placeholder="Enter Email Address"
                        />
                        <button
                            data-aos="fade-up"
                            className="btn flex"
                            type="submit"
                        >
                            SEND <FiSend className="icon" />
                        </button>
                    </div>
                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="" className="logo flex">
                                <img src={MainIcon} className="mainicon" />
                            </a>
                        </div>
                        <div data-aos="fade-up" className="footerParagraph">
                            سفّرني هو موقع ويب متميز مصمم لتلبية احتياجات
                            المسافرين الباحثين عن رحلات برية داخل سوريا. يوفر
                            الموقع مجموعة من الميزات التي تجعل تجربة السفر أكثر
                            سهولة ومتعة، بما في ذلك خيارات البحث المتقدمة،
                            وإدارة الرحلات المحجوزة، والتقييمات، والتفاعل مع
                            المستخدمين الآخرين.
                        </div>
                        <div data-aos="fade-up" className="footerSocials flex">
                            <FaTwitter className="icon" />
                            <FaYoutube className="icon" />
                            <AiFillInstagram className="icon" />
                            <FaFacebookF className="icon" />
                        </div>
                    </div>
                    <div className="footerLinks grid">
                        <div
                            data-aos="fade-up"
                            data-aos-duration="3000"
                            className="linkGroup"
                        >
                            <span className="groupTitle">OUR SURVICE</span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Service
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Tourism
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Payment
                            </li>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="4000"
                            className="linkGroup"
                        >
                            <span className="groupTitle">PARTNERS</span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Booking
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Rentcars
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Haste
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Trivage
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                TripAdv
                            </li>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="5000"
                            className="linkGroup"
                        >
                            <span className="groupTitle">LAST MINUTE</span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                London
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                California
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Indonesia
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Europe
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Oceania
                            </li>
                        </div>
                    </div>
                    <div className="footerDiv flex">
                        <small>BEST TRAVEL WEBSITE </small>
                        <small>COPYRIGHTS RESERVED - 2024</small>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Footer;
