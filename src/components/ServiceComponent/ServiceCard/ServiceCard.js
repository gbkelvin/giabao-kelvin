import React    from 'react'
import { Link } from 'react-router-dom';

import './ServiceCard.css';

const ServiceCard = ({serviceItem}) => {
    
    return (
        <div className='card-service__container'>
            <div className='card-service__item'>
                <div className='card-service__avatar'>
                    <img 
                        alt=''
                        src={serviceItem.serImage}
                        className='service__image'/>
                </div>

                <div className='card-service__info'>
                    <Link 
                        to={`/services/${serviceItem.serURL}`} 
                        className='services__links'
                        state={{serDocumentID: serviceItem.id}}>
                        <div className='service-item__name'>
                        {serviceItem.serName}
                        </div>
                    
                        <div className='service-item__sub'>
                        {serviceItem.serIntro}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard