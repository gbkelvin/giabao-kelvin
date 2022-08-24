import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as FB_SERVICES from "../../FirebaseServices/FirebaseService";
import { LanguageContext } from "../../Context/LanguageContext";
import "./Projects.css";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const languageTypeValue = useContext(LanguageContext);

  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    FB_SERVICES.getProjectDocument(undefined, languageTypeValue).then(
      (projectItem) => setProjectsList(projectItem)
    );
  }, [languageTypeValue]);

  return (
    <div className="projects__frame">
      <div className="projects__header">
        <div className="projects--header__title">
          <h5> {t("nav-bar.projects")}</h5>
          <h1> {t("projectTitle")}</h1>
        </div>
      </div>

      <div className="projects__body">
        {projectsList.map((projectItem, index) => {
          return (
            <div
              className={
                index % 2 === 0
                  ? "project--item__container--non__reverse"
                  : "project--item__container--reverse"
              }
              key={projectItem.id}
            >
              <div className="project--item__image">
                <img
                  alt="project_image"
                  src={projectItem.bgrProject}
                  className="project__image"
                />
              </div>
              <div className="project--item__info">
                <Link
                  className="project--item__links"
                  to={`/projects/${projectItem.urlProject}`}
                  state={{ proDocumentID: projectItem.id }}
                >
                  {projectItem.nameProject}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
