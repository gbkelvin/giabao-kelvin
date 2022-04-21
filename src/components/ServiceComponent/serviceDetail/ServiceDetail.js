import React, { 
  useContext, useEffect, useState }         from 'react';
import { Link, useLocation }                from 'react-router-dom';
import { FiChevronsRight }                  from "react-icons/fi";
import { useTranslation }                   from 'react-i18next';
import Layout                               from '../../LayoutComponent/Layout';
import * as FB_SERVICES                     from '../../../FirebaseServices/FirebaseService';
import { LanguageContext }                  from '../../../Context/LanguageContext';
import './ServiceDetail.css';

const ServiceDetail = () => {

  const {t, i18n} = useTranslation("translation");

  const serviceLocation     = useLocation();
  const detailServiceProps  = serviceLocation.state;

  const languageTypeValue = useContext(LanguageContext);

  const [serviceImage   , getServiceImage   ] = useState([]);
  const [serviceDetail  , getServiceDetail  ] = useState([]);
  const [serviceItem    , getServiceItem    ] = useState({});

  useEffect(() => {

    FB_SERVICES.getServiceByID(detailServiceProps, languageTypeValue)
      .then(serviceObj => 
        {
          getServiceItem(serviceObj)
          getServiceImage(serviceObj.serImageList);
          getServiceDetail(serviceObj.serDetail)
        }
      );
  }, [languageTypeValue])
  return (
    <div className='service-detail__frame'>
      <Layout>
        <div className='service-detail__header'>
          <div className='service-detail__links-container'>
            <Link to='/' className='service-detail__links link-to'>
              {t("nav-bar.home")}
            </Link>
            <div className='right-arrow__body'>
              <FiChevronsRight/>
            </div>
            <Link to='/services' className='service-detail__links link-to'>
              {t("nav-bar.services")}
            </Link>
            <div className='right-arrow__body'>
              <FiChevronsRight/>
            </div>
            <div className='service-detail__links service-url'>
            {serviceItem.serName}
            </div>
          </div>
          <div className='service-detail__title'>
          {serviceItem.serName}
          </div>
          <div className='service-detail__content'>
          {serviceItem.serContent}
          </div>
        </div>

        <div className='service-detail__body'>
          <div className='service-detail__caption'>
          {t("serviceDetail")}
          </div>

          <div className='category__container'>
            <div className='category__detail'>
              {
                serviceDetail.map(
                  (item, index) => {
                    return (
                      <div className='category__item' key={index}>
                        {item}
                      </div>
                    )
                  }
                )
              }
            </div>
          </div>
        </div>

        <div className='category-image__container'>
          {
            serviceImage.map((imgService, index ) => {
                return(
                  <div className='category-image' key={index}>
                    <img 
                      alt=''
                      className='category-image__item'
                      src={imgService}/>
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

export default ServiceDetail