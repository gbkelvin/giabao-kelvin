import React, { 
  useContext,
  useEffect, useState }         from 'react';
import { useTranslation }       from 'react-i18next';
import * as FB_SERVICES         from '../../FirebaseServices/FirebaseService';
import AlertCard                from '../../components/AlertComponent/AlertCard';
import Layout                   from '../../components/LayoutComponent/Layout';
import { validateInput, 
  validationEmail }             from '../../Utils/SupportFunction';
import { LanguageContext }      from '../../Context/LanguageContext';
import './Contacts.css';

const Contacts = () => {

  const {t, i18n} = useTranslation();
  const languageTypeValue = useContext(LanguageContext);

  const [companyInfo, setCompanyInfo    ] = useState({});

  const [isNameEmpty  , setIsNameEmpty  ] = useState(false);
  const [isEmailEmpty , setIsEmailEmpty ] = useState(false);
  const [isEmailFormat, setIsEmailFormat] = useState(true);
  const [isOpenPopup  , setIsOpenPopup  ] = useState(false);
  
  const [customerName           , setCustomerName     ] = useState('');
  const [customerEmail          , setCustomerEmail    ] = useState('');
  const [customerPhone          , setCustomerPhone    ] = useState('');
  const [supportContent         , setSupportContent   ] = useState('');
  
  const openPopUp   = () => { setIsOpenPopup(true); }
  const closePopUp  = () => { setIsOpenPopup(false); }

  const onSendClick = async () => {
   
    if(validateInput(customerName) === true && validateInput(customerEmail) === true) {

      console.log('validation empty input is true');

      setIsNameEmpty(false);
      setIsEmailEmpty(false);

      if(validationEmail(customerEmail) !== false) { 

        console.log('validation format email is true');
  
        const customerInfo = {
          customerFullName: customerName,
          customerPhone   : customerPhone,
        }

        const spContent = {
          supportContent: supportContent,
          requestTime   : String
        }

        FB_SERVICES.postContactConsultant(customerInfo, spContent, customerEmail).then(data => {console.log(data); });

        openPopUp();
      }
      setIsEmailFormat(validationEmail(customerEmail));
      
    } else {

      setIsEmailFormat(true);

      if(validateInput(customerName) === false) {
        setIsNameEmpty(true);
      } else {
        setIsNameEmpty(false);
      }
      
      if(validateInput(customerEmail) === false) {
        setIsEmailEmpty(true);
      } else {
        setIsEmailEmpty(false);
      }
    }
  }

  useEffect(() => {
    FB_SERVICES.getCompanyInformation(languageTypeValue).then(information => setCompanyInfo(information));
  }, [languageTypeValue]);

  const renderCompanyContact = () => {
    return (
      <div className='contact-company__info'>
        <div className='info__body info-body_logo'>
          <img 
            alt=''
            src={require('../../assets/logo/logoKH.png')}
            className='logo__image'/>
        </div>
        <div className='info__body info-body_name'>
          {companyInfo.companyName}
        </div>
        <div className='info__body info-body_specialize'>
          {companyInfo.companyBusiness}
        </div>
        <div className='info__body info-body_detail'>
          <div className='company-info_header'>
            {t("contactPage.openTime")}
          </div>
          <div className='company-info_body'>
          {companyInfo.openTime}
          </div>
        </div>
        <div className='info__body info-body_detail'>
          <div className='company-info_header'>
            {t("contactPage.companyAddress")}
          </div>
          <div className='company-info_body'>
            {companyInfo.companyAddress}
          </div>
        </div>
        <div className='info__body info-body_detail'>
          <div className='company-info_header'>
            {t("contactPage.companyEmail")}
          </div>
          <div className='company-info_body'>
            {companyInfo.companyEmail}
          </div>
        </div>
        <div className='info__body info-body_detail'>
          <div className='company-info_header'>
            {t("contactPage.companyPhone")}
          </div>
          <div className='company-info_body'>
            {companyInfo.companyPhone}
          </div>
        </div>
      </div>
    )
  }

  const renderCustomerContact = () => {
    return (
      <div className='contacts__customer-info'>
        <div className='contact-customer__caption'>
          {t("contactPage.contactConsultant")}
        </div>
        <div className='contacts__input-info'>
          <div className='info-input__title'>
          {`${t("contactPage.customerFullName")}*`}
          </div>
          <form 
            className={isNameEmpty === false ? 'input__form' : 'input__form input__error'}>
            <input
              className='input__field'
              placeholder={t("contactPage.cusFNameInput")}
              onChange={(event) => setCustomerName(event.target.value)}/>
          </form>
          {
            isNameEmpty ? 
              <a className='error__sentence'>{t("errorCheckInput.fulNameInputCheck")}</a>
              : 
              null
          }
        </div>
        <div className='contacts__input-info'>
          <div className='info-input__title'>
            {`${t("contactPage.customerEmail")}*`}
          </div>
          <form 
            className={isEmailEmpty === false ? 'input__form' : 'input__form input__error'}>
            <input
              className='input__field'
              placeholder={t("contactPage.cusEmailInput")}
              onChange={(event) => setCustomerEmail(event.target.value)}/>
          </form>
          {
            isEmailEmpty === true ? 
            <a className='error__sentence'>{t("errorCheckInput.emailInputCheck")}</a> : null
          }
          {
            isEmailFormat === false ? 
            <a className='error__sentence'>{t("errorCheckInput.emailFormatCheck")}</a> : null
          }
        </div>
        <div className='contacts__input-info'>
          <div className='info-input__title'>
            {`${t("contactPage.CustomerPhone")} (optional)`}
          </div>
          <form className='input__form'>
            <input
              className='input__field'
              placeholder={t("contactPage.cusPhoneInput")}
              onChange={(event) => setCustomerPhone(event.target.value)}/>
          </form>
        </div>
        <div className='contacts__input-info'>
          <div className='info-input__title'>
            {t("contactPage.reasonSupport")}
          </div>
          <form 
            className='input__form text-area'>
            <textarea 
              className='input__field input-area'
              placeholder={t("contactPage.cusSupportInput")}
              onChange={(event) => setSupportContent(event.target.value)}/>
          </form>
        </div>

        <div className='contacts__input-info'>
          <button 
            className='btn__CustomerSend'
            onClick={onSendClick}>
            {t("contactPage.sendButton")}
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className='contacts_frame'> 
      <Layout>
        <div className='contacts__header'>
          {t("contactPage.contactInformation")}
        </div>
        <div className='contacts__body'>
          <div className='contacts__company'>
            {renderCompanyContact()}
          </div>
          <div className='contacts__customer'>
            {renderCustomerContact()}
          </div>
          
        </div> 
      </Layout>
      {
        isOpenPopup ? 
        <div className='alert__frame'>
          <AlertCard 
            closePopup={closePopUp} 
            checkStatus={true}
            statusContent={t("contactPage.sendRequestStatus")}/>
        </div>
        : null
      }
    </div>
  )
}

export default Contacts