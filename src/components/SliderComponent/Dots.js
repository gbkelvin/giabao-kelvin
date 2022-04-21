import React from 'react';


const Dots = ({activeIndex, imageSlider}) => {
  return (
    <div 
      className='all-dots'>
      {
        imageSlider.map(
          (slide, index) => (
            <span 
              key={index}
              className={
                activeIndex === index ? 'dot active-dot' : 'dot'
              }>
            </span>
          )
        )
      }
    </div>
  )
}
export default Dots