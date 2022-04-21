import React              from 'react';
import { 
  IoChevronBackSharp, 
  IoChevronForwardSharp }  from "react-icons/io5";

const Arrow = ({prevSlide, nextSlide}) => {

  return (
    <div 
      className='arrow-container'>
        <IoChevronBackSharp  
          className='left-arrow' 
          onClick={prevSlide}/>

        <IoChevronForwardSharp 
          className='right-arrow' 
          onClick={nextSlide}/>
    </div>
  )
}

export default Arrow