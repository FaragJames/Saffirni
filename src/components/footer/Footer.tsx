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
                <small>ابق على تواصل </small>
                <h2>سافر معنا</h2>
              </div>
              <div className="inputDiv flex">
                <input
                  data-aos="fade-up"
                  type="text"
                  placeholder="أدخل عنوان البريد الإلكتروني"
                />
                <button data-aos="fade-up" className="btn flex" type="submit">
                  إرسال <FiSend className="icon" />
                </button>
              </div>
            </div>
    
            <div className="footerCard flex">
              <div className="footerIntro flex">
                <div className="logoDiv">
                  <a href="" className="logo flex">
                    <img src={MainIcon} className="mainicon" alt="Logo" />
                  </a>
                </div>
                <div data-aos="fade-up" className="footerParagraph">
                  سفّرني هو موقع ويب متميز مصمم لتلبية احتياجات المسافرين الباحثين عن رحلات برية داخل سوريا. يوفر الموقع مجموعة من الميزات التي تجعل تجربة السفر أكثر سهولة ومتعة، بما في ذلك خيارات البحث المتقدمة، وإدارة الرحلات المحجوزة، والتقييمات، والتفاعل مع المستخدمين الآخرين.
                </div>
                <div data-aos="fade-up" className="footerSocials flex">
                  <FaTwitter className="icon" />
                  <FaYoutube className="icon" />
                  <AiFillInstagram className="icon" />
                  <FaFacebookF className="icon" />
                </div>
              </div>
              <div className="footerLinks grid">
                <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
                  <span className="groupTitle">خدماتنا</span>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    خدمة
                  </li>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    تأمين
                  </li>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    وكالة
                  </li>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    سياحة
                  </li>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    دفع
                  </li>
                </div>
    
                <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
                  <span className="groupTitle">شركاؤنا</span>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    حجوزات
                  </li>
    
                  <li className="footerList flex">
                    <FiChevronRight className="icon" />
                    تأجير السيارات
                  </li>
    
                </div>
              </div>
              <div className="footerDiv flex">
                <small>أفضل موقع للسفر</small>
                <small>جميع الحقوق محفوظة - 2024</small>
              </div>
            </div>
          </div>
        </section>
      );
    };
    
    export default Footer;
    