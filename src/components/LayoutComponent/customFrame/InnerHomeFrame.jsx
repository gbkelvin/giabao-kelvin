import React from 'react';
import '../Layout.css';

const InnerHomeFrame = ({children, componentTitle}) => {
    return (
        <div className='inner-home__layout'>
            <div className='inner__home inner-header'>
                {String(componentTitle)}
            </div>
            <div className='inner-home inner-body'>
                {children}
            </div>
        </div>
    )
}
export default InnerHomeFrame