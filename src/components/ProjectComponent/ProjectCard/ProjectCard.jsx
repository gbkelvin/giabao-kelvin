import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./ProjectCard.css";

const ProjectCard = ({ itemProject }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="card-project__container">
      <div className="card-project__item">
        <div className="card-project__avatar">
          <img alt="" src={itemProject.proImage} className="avatar__image" />
        </div>

        <div className="card-project__info">
          <div className="projects-info">{itemProject.proName}</div>
          <Link
            className="projects-links"
            to={`/projects/${itemProject.proURL}`}
            state={{ proDocumentID: itemProject.id }}
          >
            {t("discover")}
            <HiOutlineArrowNarrowRight className="right--icon__discover" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
