import React, { useContext, useEffect, useState } from "react";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../../Context/LanguageContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Introduction.css";

AOS.init();

const Introduction = () => {
  const { t, i18n } = useTranslation("translation");
  const languageTypeValue = useContext(LanguageContext);

  const [introduction, setIntroduction] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    FB_SERVICES.getIntroductionDocument(languageTypeValue).then((intro) => {
      setIntroduction(intro);
    });
  }, [languageTypeValue]);
  return (
    <div className="info-container">
      <div className="info-frame">
        <div className="info-left__box">
          <span className="info-about">{t("nav-bar.aboutUs")}</span>
          <span className="info-header">
            <RiDoubleQuotesL className="double-quotes__icon" />
            <span className="info-header__font">
              {introduction.intro_title}
            </span>
            <RiDoubleQuotesR className="double-quotes__icon" />
          </span>
          <span className="info-content">{introduction.intro_description}</span>

          <div className="link-button__group">
            <Link className="link-about__button" to="/">
              {t("nav-bar.aboutUs")}
            </Link>

            <Link className="link-about__button" to="/">
              {t("sustainability")}
            </Link>
          </div>
        </div>

        <div className="info-right__box">
          <div
            className="background-box"
            data-aos="fade-left"
            data-aos-delay="500"
          />
          <img
            alt=""
            className="info-image"
            src={introduction.intro_image}
            data-aos="fade-up"
          />
        </div>
      </div>
      <div className="info-bottom__box">
        <span className="line-style" />
        <span className="info-footer__content">
          {introduction.intro_footer}
        </span>
        <span className="line-style" />
      </div>
    </div>
  );
};

export default Introduction;
