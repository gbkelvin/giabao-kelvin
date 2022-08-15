import React, { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import * as FB_SERVICES from "../../FirebaseServices/FirebaseService";
import { LanguageContext } from "../../Context/LanguageContext";
import "./Services.css";

const doubleDownIcon = require("../../assets/logo/double_down_arrow.png");
const service_background = require("../../assets/logo/service-background.jpg");
const tempAvt = require("../../assets/logo/valleys.png")

const Services = () => {
  const { t, i18n } = useTranslation();
  const languageTypeValue = useContext(LanguageContext);

  const [servicesList, setServicesList] = useState([]);
  const scrollDownRef = useRef(null);

  const handleClickScroll = () => {
    scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    FB_SERVICES.getServicesDocument(undefined, languageTypeValue).then(
      (serviceItem) => setServicesList(serviceItem)
    );
  }, [languageTypeValue]);

  return (
    <div className="services__frame">
      <div className="services__header">
        <img
          src={service_background}
          className="service__background"
          alt="service-background"
        />
        <div className="services--header__title">
          <h5>{t("nav-bar.services")}</h5>
          <h1>{t("servicesTitle")}</h1>
          <div className="services__scroll--down">
            <span onClick={handleClickScroll}>{t("scrollDown")}</span>
            <img
              className="scroll--down__icon"
              src={doubleDownIcon}
              alt="scroll-down"
              onClick={handleClickScroll}
            />
          </div>
        </div>
      </div>
      <div className="services__body" ref={scrollDownRef}>
        {servicesList.map((itemService, index) => {
          return (
            <div className="service--item__container" key={index}>
              <img
                src={itemService.avtService}
                className="services__avt"
                alt="services-avt"
              />
              <div className="service--item__name">
                {itemService.serviceName}
              </div>
              <div className="service--item__number">{`0${index + 1}`}</div>
              <Link
                to={`/services/${itemService.urlService}`}
                className="service--item__discover"
                state={{ serDocumentID: itemService.id }}
              >
                {t("discover")}
                <HiOutlineArrowNarrowRight className="right--icon__discover" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
