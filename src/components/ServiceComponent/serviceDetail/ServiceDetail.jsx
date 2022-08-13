import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";
import { LanguageContext } from "../../../Context/LanguageContext";
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { t, i18n } = useTranslation("translation");

  const serviceLocation = useLocation();
  const detailServiceProps = serviceLocation.state;
  const languageTypeValue = useContext(LanguageContext);

  const [serviceItem, getServiceItem] = useState({});
  const [serviceDetail, getServiceDetail] = useState([]);
  const [serviceProcess, getServiceProcess] = useState([]);

  useEffect(() => {
    FB_SERVICES.getServiceByID(detailServiceProps, languageTypeValue).then(
      (serviceItem) => {
        getServiceItem(serviceItem);
        getServiceDetail(serviceItem.service_detail || []);
        getServiceProcess(serviceItem.service_process || []);
      }
    );
  }, [languageTypeValue]);

  return (
    <div className="service--detail__frame">
      <div className="service__header--bgr">
        <img
          alt="service-background"
          className="service--bgr__image"
          src={serviceItem.bgr_service}
        />
        <div className="service--title__frame">
          <div className="service--name__style">{serviceItem.service_name}</div>
          <div className="service--title__style">
            {serviceItem.service_title}
          </div>
        </div>
      </div>

      <div className="service__body--bgr">
        {serviceDetail.map((itemService, index) => {
          return (
            <div
              className={
                index % 2 === 0
                  ? "service--item__frame"
                  : "service--item__frame reverse--item"
              }
              key={itemService.service_item_id}
            >
              <div className="service-item-left__box">
                <h5>{itemService.service_item_name}</h5>
                <h1>{itemService.service_item_title}</h1>
                <span>{itemService.service_item_des}</span>
              </div>
              <div className="service-item-right__box">
                <img src={itemService.service_item_image} />
              </div>
            </div>
          );
        })}

        <div className="our--process__header">
          <span className="our--process__span">{t("ourProcess")}</span>
          <span className="our--process__line"></span>
        </div>

        <div className="service--item__frame">
          <div className="service-item-left__box our--process">
            {serviceProcess.map((itemProcess, index) => {
              return (
                <div
                  className="our--process__box"
                  key={itemProcess.service_process_id}
                >
                  <div className="our--process__number">{`0${index + 1}`}</div>
                  <div className="our--process__title">
                    <h5>{itemProcess.service_process_name}</h5>
                    <h3>{itemProcess.service_process_title}</h3>
                    <span>{itemProcess.service_process_des}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="service-item-right__box our--process">
            <img src={serviceItem.img_process_service} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
