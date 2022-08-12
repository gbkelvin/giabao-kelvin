import React, { 
  useEffect, useState, useContext }     from 'react';
import { useTranslation }               from 'react-i18next';
import ServiceCard                      from '../../components/ServiceComponent/ServiceCard/ServiceCard';
import Layout                           from '../../components/LayoutComponent/Layout';
import CardItem                         from '../../components/LayoutComponent/customFrame/CardItem';
import * as FB_SERVICES                 from '../../FirebaseServices/FirebaseService';
import { LanguageContext }              from '../../Context/LanguageContext';
import './Services.css';
const Services = () => {

  const {t, i18n} = useTranslation();
  const languageTypeValue = useContext(LanguageContext);
  
  const [ servicesList, setServicesList ] = useState([]);

  // useEffect(() => { 
  //   FB_SERVICES.getServices(undefined, languageTypeValue).then(serviceItem => setServicesList(serviceItem));
  // }, [languageTypeValue]);

  return (
    <div className='services__frame'>
      <Layout>
        <div className='services__header'>
          {t("servicesTitle")}
        </div>

        <div className='services__body'>
          {
            servicesList.map(
              (serviceItem, index) => {
                return (
                  <CardItem key={index}>
                    <ServiceCard serviceItem={serviceItem}/> 
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

export default Services