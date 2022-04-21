import React, {useState, useEffect}   from 'react'
import SliderImage                    from './SliderImage';
import Arrow                          from './Arrow';
import Dots                           from './Dots';
import * as FB_COLLECTION             from '../../FirebaseServices/firebaseContext';
import * as FB_SERVICES               from '../../FirebaseServices/FirebaseService';
import './Slider.css';

var length = 0;

const Slider = () => {

  const [ current     , setCurrent    ] = useState(0);
  const [ slideImage , setSlideImage  ] = useState([]);

  const getImages = async (type) => {
    FB_SERVICES.getSliderImagesByID(type)
    .then(images => setSlideImage(images));
  }

  length = slideImage.length - 1;

  const changeWindow = () => {

    let windowSize = window.innerWidth;
   
    if(windowSize <= 720) {
      getImages('mobile');
    } else {
      getImages('web')
    }

  }

  useEffect(() => {
    changeWindow();
    window.addEventListener('resize', changeWindow);
  }, []);
  return (
    <div 
      className='slider-container'>
      <SliderImage 
        activeIndex={current} 
        imageSlider={slideImage}/>
      <Arrow 
        prevSlide={
          () => setCurrent( current < 1 ? length : current - 1 )
        }
        nextSlide={
          () => setCurrent( current === length ? 0 : current + 1 )
        }/> 
      <Dots 
        activeIndex={current} 
        imageSlider={slideImage}/>
    </div>
  )
}


export default Slider