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
      <div 
        className={clicked ? 'navbar__title active' : 'navbar__title'}
        onClick={closeMobileMenu}>
        <div className='navbar__item'>
          <Link className='navbar-item__links' to='/'>
            {t("nav-bar.home")}
          </Link>
        </div>
        <div className='navbar__item'>
          <Link 
            className='navbar-item__links' 
            to='/about'
            onClick={closeMobileMenu}>
            {t("nav-bar.aboutUs")}
          </Link>
        </div>
        <div className='navbar__item'>
          <Link 
            className='navbar-item__links' 
            to='/projects'
            onClick={closeMobileMenu}>
            {t("nav-bar.projects")}
          </Link>
        </div>
        <div className='navbar__item'>
          <Link 
            className='navbar-item__links' 
            to='/services'
            onClick={closeMobileMenu}>
            {t("nav-bar.services")}
          </Link>
        </div>
        <div className='navbar__item'>
          <Link 
            className='navbar-item__links' 
            to='/blogs'
            onClick={closeMobileMenu}>
            {t("nav-bar.blogs")}
          </Link>
        </div>
        <div className='navbar__item'>
          <Link 
            className='navbar-item__links' 
            to='/contacts'
            onClick={closeMobileMenu}>
            {t("nav-bar.contacts")}
          </Link>
        </div>
      </div>
    )
  }

  const renderLanguagesBox = () => {
    return (
      <div className='languages__option'>
        <div 
          className='flag__item'
          onClick={() => handleChangeLanguages('en')}>
          <img 
            alt=''
            src={require('../../assets/englishFlag.png')}
            className={
              isEN === true ? 
              'flag__img flag-img__active' 
              : 
              'flag__img'
            }/>
        </div>

        <div 
          className='flag__item'
          onClick={() => handleChangeLanguages('vn')}>
          <img 
            alt=''
            src={require('../../assets/vietnamFlag.png')}
            className={
              isVN === true ? 
              'flag__img flag-img__active' 
              : 
              'flag__img'
            }/>
        </div>

        <div 
          className='menu__icon'
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

  return (
    <div className='navbar__container'>
      <div className='navbar__logo'>
        <Link 
          to='/' 
          className='navbar-link__logo' 
          onClick={closeMobileMenu}>
          <div className='link__name'>
            KHANG
          </div>
          <div className='link__name'>
            HIỀN
          </div>
        </Link>
      </div>
      {renderNavbarMenu()}
      {renderLanguagesBox()}
    </div>
  )
}

export default Navbar