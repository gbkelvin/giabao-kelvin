import React, { 
    useContext, useEffect, useState }   from 'react';
import CardItem                         from '../../../components/LayoutComponent/customFrame/CardItem';
import ProjectCard                      from '../../../components/ProjectComponent/ProjectCard/ProjectCard';
import { LanguageContext }              from '../../../Context/LanguageContext';
import * as FB_SERVICES                 from '../../../FirebaseServices/FirebaseService';
import './Outstand.css';

const Outstand = () => {

    const languageTypeValue = useContext(LanguageContext);

    const [ outStandProjects, setOutStandProjects ] = useState([]);
    
    useEffect(() => {     
        FB_SERVICES.getProjects('OTP', languageTypeValue).then(outStandProject => setOutStandProjects(outStandProject));
    }, [languageTypeValue]);

    return (
        <div className='outstand-projects__container'>
        {
            outStandProjects.map(
                (outStandItem, index) => {
                    return (
                        <CardItem key={index}>
                            <ProjectCard itemProject={outStandItem}/> 
                        </CardItem>
                    )
                }
            )
        }
        </div>
    )
}

export default Outstand