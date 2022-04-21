import React, { 
  useContext,
  useEffect,
  useState }                from 'react';
import { useTranslation }   from 'react-i18next';
import Layout               from '../../components/LayoutComponent/Layout';
import * as FB_SERVICES     from '../../FirebaseServices/FirebaseService';
import { LanguageContext } from '../../Context/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const {t, i18n} = useTranslation("translation");

  const [companyInfo, getCompanyInfo  ] = useState({});
  const [aboutUsIntro, getAboutUsIntro] = useState({});
  const [topicAboutUs, getTopicAboutUs] = useState([]);

  const languageTypeValue = useContext(LanguageContext);

  useEffect(() => {
    FB_SERVICES.getCompanyInformation(languageTypeValue)
      .then(information => {
        getCompanyInfo(information);
      }
    );
    FB_SERVICES.getAboutUs(languageTypeValue)
      .then(aboutUsIntroData => {
        getAboutUsIntro(aboutUsIntroData);
        FB_SERVICES.getTopicAboutUs(languageTypeValue)
        .then(topicData => getTopicAboutUs(topicData));
      }
    );
  }, [languageTypeValue])
  
  return (
    <div className='about__frame'>
      <div className='about__header'>
        <div className='about-header__title'>
          <div className='about__title-description'>
            <div className='about-title__intro'>
              {t("aboutUsIntro")}
            </div>
            <div className='about-title__company-name'>
              {companyInfo.companyName}
            </div>
            <div className='about-title__content'>
              {aboutUsIntro.aboutUsIntro}
            </div>
          </div>
        </div>
        <div className='about-header__img'>
          <img 
            alt=''
            src={aboutUsIntro.aboutUsImage}
            className='about__image'/>
        </div>
      </div>
      <Layout>
        <div className='about__body'>
          {
            topicAboutUs.map(
              (topicItem, index) => {
                return(
                  <div 
                    key={index}
                    className={
                      index%2 !== 0 ? 'about-body__detail style-right' : 'about-body__detail style-left' 
                    }>
                    <div className='about-body__img'>
                      <img 
                        alt=''
                        src={topicItem.topicImage}
                        className='about__image'/>
                    </div>
        
                    <div className={
                      index%2 !== 0 ? 'about-body__content pos-left' : 'about-body__content pos-right'
                    }>
                      <div className='about-body__title'>
                        {topicItem.topicTitle}
                      </div>
                      <div className='about-body__sub'>
                        {topicItem.topicContent}
                      </div>
                    </div>
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

export default AboutUs