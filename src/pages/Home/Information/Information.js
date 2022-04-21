import React, { 
  useContext, useEffect, useState }     from 'react';
import { Link }                         from 'react-router-dom';
import * as FB_SERVICES                 from '../../../FirebaseServices/FirebaseService';
import { useTranslation }               from 'react-i18next';
import { LanguageContext }              from '../../../Context/LanguageContext';
import './Information.css';

const Information = () => {

  const {t, i18n} = useTranslation("translation");
  const languageTypeValue = useContext(LanguageContext);

  const [companyInfo, setCompanyInfo  ] = useState({});
  const [companyIntro, setCompanyIntro] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    FB_SERVICES.getCompanyInformation(languageTypeValue)
      .then(information => {
        setCompanyInfo(information);
        setCompanyIntro(information.companyIntroduction);
      }
    );
  }, [languageTypeValue]);
  
  return (
    <div className='info-container'> 
      <div className='info-detail'>
        <div className='info-header'>
          {companyInfo.companyName}
        </div>
        <div className='info-content'>
          {
            companyIntro.map((intro, index) => {
              return (<span key={index}>{intro}</span>);
            })
          }
        </div>
        <Link 
            className='info-link' 
            to='/about'>
            {t("homePage.learnMoreInfo")}
        </Link>
      </div>

      <div className='info-image'>
        <img 
          alt=''
          src={require('../../../assets/infor-backgroud.jpg')} 
          className='image'/>
      </div>
    </div>
  )
}

export default Information