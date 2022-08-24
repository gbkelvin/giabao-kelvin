import React                from 'react';
import VideoComponent       from '../../components/VideoComponent/VideoComponent';
import Introduction         from './Introduction/Introduction';
import Outstand             from './Outstand/Outstand';
import OurService           from './OurServices/OurService';
import NewArticles          from './NewArticles/NewArticles';
import { useTranslation }   from 'react-i18next';
import './Home.css';
import Client from './Client/Client';

const Home = () => {
 
  const {t, i18n} = useTranslation("translation");

  return (
    <div className='home__container'>
      <VideoComponent/>
      <Introduction/>
      <OurService/>
      <Outstand/>
      <Client/>
        {/* <InnerHomeFrame
          componentTitle={t("homePage.newArticle")}>
          <NewArticles/>
        </InnerHomeFrame> */}
    </div>
  )
}

export default Home