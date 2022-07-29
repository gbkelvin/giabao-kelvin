import React from 'react'

const VideoDots = (props) => {
    const onDotClick = (indexValue) => {
        props.onSelectedDot(indexValue)
    }
  return (
    <div 
      className='all-dots__container'>
      {
        props.videoSlider.map(
          (videos, index) => (
            <span 
              key={index}
              className={
                props.activeIndex === index ? 'dot-style active-dot' : 'dot-style'
              }
              onClick={() => onDotClick(index)}>
            </span>
          )
        )
      }
    </div>
  )
}

export default VideoDots