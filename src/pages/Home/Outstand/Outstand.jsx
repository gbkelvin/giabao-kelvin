import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardItem from "../../../components/LayoutComponent/customFrame/CardItem";
import ProjectCard from "../../../components/ProjectComponent/ProjectCard/ProjectCard";
import { LanguageContext } from "../../../Context/LanguageContext";
import * as FB_SERVICES from "../../../FirebaseServices/FirebaseService";
import "./Outstand.css";

const Outstand = () => {
  const languageTypeValue = useContext(LanguageContext);
  const { t, i18n } = useTranslation("translation");

  const [outStandProjects, setOutStandProjects] = useState([]);

  useEffect(() => {
    FB_SERVICES.getProjects("OTP", languageTypeValue).then((outStandProject) =>
      setOutStandProjects(outStandProject)
    );
  }, [languageTypeValue]);

  return (
    <div className="outstand-projects__container">
      <div className="outstand-project__header">
        <div className="outstand--title">{t("homePage.outStandProject")}</div>
      </div>
      <div className="outstand-project__body">
        {outStandProjects.map((outStandItem, index) => {
          return (
            <CardItem key={index}>
              <ProjectCard itemProject={outStandItem} />
            </CardItem>
          );
        })}
      </div>
    </div>
  );
};

export default Outstand;
