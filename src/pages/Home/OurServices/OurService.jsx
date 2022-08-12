import React, { 
    useContext, useEffect, useState }   from 'react';
import CardItem                         from '../../../components/LayoutComponent/customFrame/CardItem';
import ServiceCard                      from '../../../components/ServiceComponent/ServiceCard/ServiceCard';
import * as FB_SERVICES                 from '../../../FirebaseServices/FirebaseService';
import { LanguageContext }              from '../../../Context/LanguageContext';
import './OurService.css';

const OurService = () => {

    const languageTypeValue = useContext(LanguageContext);

    const [ outStandServices, setOutStandServices ] = useState([]);

    useEffect(() => { 
        FB_SERVICES.getServicesDocument('OTP', languageTypeValue).then(outStandService => setOutStandServices(outStandService))
    }, [languageTypeValue]);
  return (
    <div className='our-service__container'>
    {
        outStandServices.map(
            (itemService) => {
                return (
                    <CardItem key={itemService.id}>
                        <ServiceCard serviceItem={itemService}/>
                    </CardItem>
                )
            }
        )
    }
    </div>
  )

}

export default OurService