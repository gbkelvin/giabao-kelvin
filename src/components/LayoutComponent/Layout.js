import React from 'react';
import './Layout.css';

const Layout = (props) => {
  return (
    <div className='max-width-layout__container'>
        {props.children}
    </div>
  )
}
export default Layout