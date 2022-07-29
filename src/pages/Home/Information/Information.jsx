import React, { useContext, useEffect, useState } from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../Context/LanguageContext";
import "./Information.css";

const Information = () => {
  const { t, i18n } = useTranslation("translation");
  const languageTypeValue = useContext(LanguageContext);

  const [companyInfo, setCompanyInfo] = useState({});
  const [companyIntro, setCompanyIntro] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    FB_SERVICES.getCompanyInformation(languageTypeValue).then((information) => {
      setCompanyInfo(information);
      setCompanyIntro(information.companyIntroduction);
    });
  }, [languageTypeValue]);

  return (
    <div className="info-container">
      <div className="info-frame">
        <div className="info-left__box">
          <span className="info-about">
            {t("nav-bar.aboutUs")}</span>
          <span className="info-header">
            <RiDoubleQuotesL className="double-quotes__icon" />
            <span className="info-header__font">
              We are innovative and forward-thinking
            </span>
            <RiDoubleQuotesR className="double-quotes__icon" />
          </span>
          <span className="info-content">
            We have identified the need for truly unique, but durable and
            sustainable flooring. There are endless possibilities of colours,
            laying pattern, borders and even motifs or logos, which can be
            incorporated into your floor. We can provide an unrivalled choice of
            the highest quality and stylish flooring for both commercial and
            domestic settings, offering up to an lifetime guarantee.
          </span>

          <div className="link-button__group">
            <Link className="link-about__button" to="/">
              About
            </Link>

            <Link className="link-about__button" to="/">
              Sustainability
            </Link>
          </div>
        </div>

        <div className="info-right__box">
          <div className="background-box" />
          <img
            alt=""
            className="info-image"
            src={require("../../../assets/InfoBackground.jpg")}
          />
        </div>
      </div>
      <div className="info-bottom__box">
        <span className="line-style" />
        <span className="info-footer__content">tailored flooring to suit</span>
        <span className="line-style" />
      </div>
    </div>
  );
};

export default Information;
