import React from 'react';

const SliderImage = ({activeIndex, imageSlider}) => {

    return (
        <section>
          {
            imageSlider.map(
              (slide, index) => (
                <div 
                  key={index} 
                  className={
                    index === activeIndex ? 'slide active' : 'slide'
                  }>
                    <img 
                      className='slide-image' 
                      src={slide} alt=''/>
                </div>
              )
            )
          }
        </section>
      )
}

export default SliderImage