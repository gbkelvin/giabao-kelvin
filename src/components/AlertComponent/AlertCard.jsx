import React from "react";
import { FiCheck, FiX } from "react-icons/fi";
import Alert from "react-bootstrap/Alert";
import "./AlertCard.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AlertCard = (props) => {
  const renderAlertIcon = () => {
    return (
      <div className="progress-circle">
        {props.checkStatus === false ? (
          <FiX className="checked__icon" />
        ) : (
          <FiCheck className="checked__icon" />
        )}
      </div>
    );
  };
  return (
    <Alert
      variant={props.checkStatus ? "success" : "danger"}
      onClick={props.closePopup}
    >
      <div className="alert__container">
        {renderAlertIcon()}
        {props.statusContent}
      </div>
    </Alert>
  );
};

export default AlertCard;
