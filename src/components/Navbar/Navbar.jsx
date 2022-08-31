import React, {useEffect, useState}   from 'react'
import { FaBars, FaTimes }            from "react-icons/fa";
import { Link }                       from 'react-router-dom';
import { useTranslation }             from 'react-i18next';
import './Navbar.css';

const Navbar = ({getLanguageType}) => {

  const {t, i18n} = useTranslation("translation");

  const [isVN, setIsVN] = useState(true); //default languages
  const [isEN, setIsEN] = useState(false);

  const [clicked, setClick] = useState(false);
  const handleClick = () => setClick(!clicked);
  const closeMobileMenu = () => setClick(false);

  const handleChangeLanguages = (languagesID) => {
    i18n.changeLanguage(languagesID);
    getLanguageType(languagesID);
  }

  useEffect(() => {
    if(i18n.language === "vn") {
      setIsVN(true);
      setIsEN(false);
      console.log("Vietnamese", i18n.language);
    } else if(i18n.language === "en") {
      setIsVN(false);
      setIsEN(true);
      console.log("English", i18n.language);
    }
  }, [i18n.language]);

  const renderNavbarMenu = () => {
    return (
      <div className={clicked ? 'navbar-menu__container menu-active' : 'navbar-menu__container'}>
        <div className='navbar--menu'>
          <Link className='link-menu__item' to='/'>
            {t("nav-bar.home")}
          </Link>
          <Link 
            className='link-menu__item' 
            // to='/about'
            to='/'
            onClick={closeMobileMenu}>
            {t("nav-bar.aboutUs")}
          </Link>
          <Link 
            className='link-menu__item' 
            to='/projects'
            onClick={closeMobileMenu}>
            {t("nav-bar.projects")}
          </Link>
          <Link 
            className='link-menu__item' 
            to='/services'
            onClick={closeMobileMenu}>
            {t("nav-bar.services")}
          </Link>
        </div>
        <div className='navbar--language'>
          <span 
            className={
              isEN === true ? 
              'lang--item lang--active'
              :
              'lang--item'
            }
            onClick={() => handleChangeLanguages('en')}>
              EN
          </span>
          <span 
            className={
              isVN === true ? 
              'lang--item lang--active'
              :
              'lang--item'
            }
            onClick={() => handleChangeLanguages('vn')}>
              VN
          </span>
          <span className='horizon-divider'/>
          <Link 
            className='link-menu__item' 
            to='/contacts'
            onClick={closeMobileMenu}>
            {t("nav-bar.contacts")}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='navbar__container'>
      <div className='navbar--logo'>
        <Link 
          to='/' 
          className='link--logo' 
          onClick={closeMobileMenu}>
          KHANG HIỀN
        </Link>
      </div>
      {renderNavbarMenu()}
      <div 
        className='navbar-mobile__icon'
        onClick={handleClick}>
        {
          clicked ? 
          <FaTimes className='fa-icons'/>
          : 
          <FaBars className='fa-icons'/>
        }
      </div>
    </div>
  )
}

export default Navbar