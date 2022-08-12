import React from 'react';
import '../Layout.css';

const CardItem = ({children}) => {
  return (
    <div className='card-item__layout'>
        {children}
    </div>
  )
}

export default CardItem