import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";
import { LanguageContext } from "../../../Context/LanguageContext";
import "./ProjectDetail.css";

const pjItem = require("../../../assets/logo/service-background.jpg");
const avtItem = require("../../../assets/logo/valleys.png");

const ProjectDetail = () => {
  const { t, i18n } = useTranslation("translation");

  const languageTypeValue = useContext(LanguageContext);

  const detailProjectLocation = useLocation();
  const detailProjectProps = detailProjectLocation.state;

  const [detailProject, setDetailProject] = useState([]);
  const [itemProject, setItemProject] = useState({});

  useEffect(() => {
    FB_SERVICES.getProjectByID(detailProjectProps, languageTypeValue).then(
      (projectItem) => {
        setItemProject(projectItem);
        setDetailProject(projectItem.project_item);
      }
    );
  }, [languageTypeValue]);
  return (
    <div className="project-detail__frame">
      <div className="project__header--bgr">
        <img
          alt="project-background"
          className="project--bgr__image"
          src={itemProject.project_bgr}
        />
        <div className="project--title__frame">
          <div className="project--name__style">{itemProject.project_name}</div>
          <div className="project--title__style">{itemProject.project_description}</div>
        </div>
      </div>

      <div className="project__body--bgr">
        {detailProject.map((projectItem, index) => {
          return (
            <div className="project--item__box" key={index}>
              <div className={
                index % 2 !== 0
                  ? "project--item__frame__non--reverse"
                  : "project--item__frame__reverse"
              }>
                <div className="project-item-left__box">
                  <h5>{projectItem.project_item_name}</h5>
                  <h2>
                  {projectItem.project_item_title}
                  </h2>
                </div>
                <div className=
                {
                  index % 2 !== 0
                    ? "project-item-right__box align-image__right"
                    : "project-item-right__box align-image__left"
                }>
                  <img src={projectItem.project_item_image} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectDetail;
