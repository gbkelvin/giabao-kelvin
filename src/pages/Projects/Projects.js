import React, {
  useState, useEffect, useContext}    from 'react';
import { useTranslation }             from 'react-i18next';
import Layout                         from '../../components/LayoutComponent/Layout';
import ProjectCard                    from '../../components/ProjectComponent/ProjectCard/ProjectCard';
import CardItem                       from '../../components/LayoutComponent/customFrame/CardItem';
import * as FB_SERVICES               from '../../FirebaseServices/FirebaseService';
import { LanguageContext }            from '../../Context/LanguageContext';
import './Projects.css';

const Projects = () => {

  const {t, i18n} = useTranslation();
  const languageTypeValue = useContext(LanguageContext);

  const [projectsList, setProjectsList] = useState([]);
  
  // useEffect(() => {
  //   FB_SERVICES.getProjects(undefined, languageTypeValue).then(projectItem => setProjectsList(projectItem));
  // }, [languageTypeValue])

  return (
    <div className='projects__frame'>
      <Layout>
        <div className='projects__header'>
          {t("projectTitle")}
        </div>

        <div className='projects__body'>
          {
            projectsList.map(
              (projectItem, index) => {
                return (
                  <CardItem key={index}>
                      <ProjectCard itemProject={projectItem}/> 
                  </CardItem>
                )
              }
            )
          }
        </div>
      </Layout>
    </div>
  )
}

export default Projects