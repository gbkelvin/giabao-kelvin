import React, { useContext, useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaViber, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import AlertCard from "../AlertComponent/AlertCard";
import { validateInput, validationEmail } from "../../Utils/SupportFunction";
import * as FB_SERVICES from "../../FirebaseServices/FirebaseService";
import { LanguageContext } from "../../Context/LanguageContext";

import "./Footer.css";

const Footer = () => {
  const { t, i18n } = useTranslation("translation");

  const languageTypeValue = useContext(LanguageContext);

  const [footerInfo, setFooterInfo] = useState([]);

  const [newsletterEmail, setNewSletterEmail] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isEmailFormat, setIsEmailFormat] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [statusContent, setStatusContent] = useState("");

  const openPopUp = () => {
    setIsOpenPopup(true);
  };
  const closePopUp = () => {
    setIsOpenPopup(false);
    console.log("close popup");
  };

  const onSendNewSletterEmail = async () => {
    if (validateInput(newsletterEmail) === false) {
      setIsEmailEmpty(true);
      setIsEmailFormat(true);
      console.log("validation empty input is false");
      return;
    } else {
      console.log("validation empty input is true");

      if (validationEmail(newsletterEmail) !== false) {
        console.log("validation format email is true");

        const newSletterObject = {
          newSletterEmail: newsletterEmail.toLowerCase(),
          timeCreateEmail: String,
        };

        FB_SERVICES.getNewSletterEmailByEmail(newsletterEmail).then(
          (resultEmail) => {
            console.log("is checking exist:", resultEmail);
            if (resultEmail === undefined) {
              console.log(`email you send ${newsletterEmail} is not exist`);
              FB_SERVICES.postNewSletterEmail(newSletterObject);
              setIsSuccessful(true);
              setStatusContent(t("footer.regisEmailSuccess"));
              openPopUp();
            } else {
              console.log(`we found the ${resultEmail} in database`);
              setStatusContent(t("footer.regisEmailFail"));
              setIsSuccessful(false);
              openPopUp();
            }
          }
        );
      }
      setIsEmailFormat(validationEmail(newsletterEmail));
    }
  };

  useEffect(() => {
    FB_SERVICES.getCompanyInformation(languageTypeValue).then((footerInfo) =>
      setFooterInfo(footerInfo)
    );
  }, [languageTypeValue]);

  const renderCompanyLogoName = () => {
    return (
      <div className="company__logo-name">
        <div className="company__logo">
          <img
            alt=""
            src={require("../../assets/logo/logoKH.png")}
            className="company-logo__img"
          />
        </div>
        <div className="company__name-box">
          <div className="company__name">{footerInfo.companyName}</div>
          <div className="company__specialize">
            {footerInfo.companyBusiness}
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyLinks = () => {
    return (
      <div className="company-link__box">
        <div className="footer__title">{t("footer.company")}</div>
        <div className="footer__links">
          <Link className="info-links" to="/about">
            {t("nav-bar.aboutUs")}
          </Link>
          <Link className="info-links" to="/projects">
            {t("nav-bar.projects")}
          </Link>
          <Link className="info-links" to="/services">
            {t("nav-bar.services")}
          </Link>
          <Link className="info-links" to="/blogs">
            {t("nav-bar.blogs")}
          </Link>
        </div>
      </div>
    );
  };

  const renderCompanyContact = () => {
    return (
      <div className="company-info__box">
        <div className="footer__title">{t("footer.contactUs")}</div>
        <div className="info__contact">
          <div className="info-contact__body">{footerInfo.companyAddress}</div>
          <div className="info-contact__body">{footerInfo.companyPhone}</div>
          <div className="info-contact__body">{footerInfo.companyEmail}</div>
        </div>
      </div>
    );
  };

  const renderNewsletterInput = () => {
    return (
      <div className="newsletter-email__box">
        <div className="footer__title">{t("footer.newSletter")}</div>
        <div className="newsletter__body">
          <form className="newsletter__input-form">
            <FaEnvelope className="newsletter-email__icon" />
            <input
              className="newsletter-email__input"
              placeholder={t("footer.newSletterInput")}
              onChange={(event) => setNewSletterEmail(event.target.value)}
            />
            <BsArrowRight
              className="newsletter-sends__icons"
              onClick={onSendNewSletterEmail}
            />
          </form>
          {isEmailEmpty === true ? (
            <div className="error__status">
              {t("errorCheckInput.emailInputCheck")}
            </div>
          ) : null}
          {isEmailFormat === false ? (
            <div className="error__status">
              {t("errorCheckInput.emailFormatCheck")}
            </div>
          ) : null}
          <div className="social__icons">
            <FaFacebook className="social-icon__item" />
            <FaInstagram className="social-icon__item" />
            <FaViber className="social-icon__item" />
          </div>
        </div>
      </div>
    );
  };

  const renderGroupPolicy = () => {
    return (
      <div className="footer__bottom">
        {/* <div className="footer-rules__box">
          <Link to="/policy" className="rules_text links_rule">
            Privacy Policy
          </Link>
          <div className="rules_text horizonLine">|</div>
          <Link to="/policy" className="rules_text links_rule">
            Cookie Policy
          </Link>
          <div className="rules_text horizonLine">|</div>
          <Link to="/policy" className="rules_text links_rule">
            Terms Of Use
          </Link>
        </div> */}
        <div className="footer-tag__box">
          Copyright © 2022 Khang Hien Design and Construction.
        </div>
      </div>
    );
  };

  return (
    <div className="footer__container">
      <div className="footer__frame">
        <div className="footer__top">
          {renderCompanyLogoName()}
          {renderCompanyLinks()}
          {renderCompanyContact()}
          {renderNewsletterInput()}
        </div>
        {renderGroupPolicy()}
      </div>
      {isOpenPopup ? (
        <div className="alert-footer__frame">
          <AlertCard
            closePopup={closePopUp}
            checkStatus={isSuccessful}
            statusContent={statusContent}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Footer;
