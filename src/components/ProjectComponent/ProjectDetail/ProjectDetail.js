import React, { 
  useContext, useEffect, useState }   from 'react'
import { Link, useLocation }          from 'react-router-dom'
import { FiChevronsRight }            from 'react-icons/fi';
import { useTranslation }             from 'react-i18next';
import * as FB_SERVICES               from '../../../FirebaseServices/FirebaseService';
import Layout                         from '../../LayoutComponent/Layout';
import { LanguageContext }            from '../../../Context/LanguageContext';
import './ProjectDetail.css';

const ProjectDetail = () => {

  const {t, i18n} = useTranslation("translation");

  const languageTypeValue = useContext(LanguageContext);

  const detailProjectLocation   = useLocation();
  const detailProjectProps      = detailProjectLocation.state;

  const [detailProject, setDetailProject] = useState({});
  const [imageProject, setImageProject] = useState([]);

  useEffect(() => {
    FB_SERVICES.getProjectByID(detailProjectProps, languageTypeValue)
    .then(projectItem => {
      setImageProject(projectItem.proImageList);
      setDetailProject(projectItem)
    })
  }, [languageTypeValue]);
  
  return (
    <div className='project-detail__frame'>
      <Layout>
        <div className='project-detail__header'>
          <div className='project-detail__links-container'>
            <Link to='/' className='project-detail__links link-to'>
              {t("nav-bar.home")}
            </Link>
            <div className='right-arrow__body'>
              <FiChevronsRight/>
            </div>
            <Link to='/projects' className='project-detail__links link-to'>
              {t("nav-bar.projects")}
            </Link>
            <div className='right-arrow__body'>
              <FiChevronsRight/>
            </div>
            <div className='project-detail__links project-url'>
              {detailProject.proName}
            </div>
          </div>
          <div className='project-detail__title'>
            {detailProject.proName}
          </div>
        </div>

        <div className='project-detail-images'>
          {
            imageProject.map(
              (projectImg, index) => {
                return (
                  <div className='detail-image' key={index}>
                    <img src={projectImg} className='item-image' alt=''/>
                  </div>
                )
              }
            )
          }
        </div>
      </Layout>
    </div>
  )
}

export default ProjectDetail