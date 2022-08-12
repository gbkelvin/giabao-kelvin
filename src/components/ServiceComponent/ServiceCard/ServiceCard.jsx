import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

const ServiceCard = ({ serviceItem }) => {
    const {t, i18n} = useTranslation("translation");
  return (
    <div className="card-service__container">
      <div className="card-service__item">
        <div className="card-service__avatar">
          <img
            alt=""
            src={serviceItem.iconService}
            className="service__image"
          />
        </div>

        <div className="card-service__info">
          <div className="service-item__name">{serviceItem.serviceName}</div>
          <div className="service-item__sub">{serviceItem.serviceIntro}</div>
          <Link
            to={`/services/${serviceItem.urlService}`}
            className="services__links"
            state={{ serDocumentID: serviceItem.id }}
          >
            {t("learnMore")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
