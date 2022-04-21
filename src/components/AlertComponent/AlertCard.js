import React            from 'react';
import { FiCheck, FiX } from "react-icons/fi";
import './AlertCard.css';

const AlertCard = (props) => {

    const renderAlertIcon = () => {
        return(
            <div className='progress-circle'>
            {
                props.checkStatus === false ? 
                <FiX className='checked__icon'/>
                :
                <FiCheck className='checked__icon'/>
            }
            </div>
        )
    }
    return (
        <div 
            className={
                props.checkStatus === false ?
                'alert__container fail-status'
                :
                'alert__container'
            }
            onClick={props.closePopup}>
            {renderAlertIcon()}
            <div className='status__content'>
                {props.statusContent}
            </div>
        </div>
    )
}

export default AlertCard