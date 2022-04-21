import React    from 'react'
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({itemProject}) => {
  
  return (
    <div className='card-project__container'>
      <div className='card-project__item'>
        <div className='card-project__avatar'>
          <img 
            alt=''
            src={itemProject.proImage} 
            className='avatar__image'/>
        </div>

        <div className='card-project__info'>
          <Link 
            className='projects-links'
            to={`/projects/${itemProject.proURL}`}
            state={
              {proDocumentID: itemProject.id}
            }>
            <div className='project-item__name'>
              {itemProject.proName}  
            </div>

            <div className='project-item__sub'>
              {itemProject.proIntro}
            </div>
          </Link>
        </div>   
      </div>
    </div>
  )

}

export default ProjectCard