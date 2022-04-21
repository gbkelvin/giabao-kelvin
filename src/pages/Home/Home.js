import React                from 'react'
import Slider               from '../../components/SliderComponent/Slider';
import Information          from './Information/Information';
import Outstand             from './Outstand/Outstand';
import OurService           from './OurServices/OurService';
import NewArticles          from './NewArticles/NewArticles';
import Layout               from '../../components/LayoutComponent/Layout';
import InnerHomeFrame       from '../../components/LayoutComponent/customFrame/InnerHomeFrame';
import { useTranslation }   from 'react-i18next';
import './Home.css';
const Home = () => {
 
  const {t, i18n} = useTranslation("translation");

  return (
    <div className='home__container'>
      <Slider/>
      <Information/>
      <Layout>
        <InnerHomeFrame 
          componentTitle={t("homePage.outStandProject")}>
          <Outstand/>
        </InnerHomeFrame>
        <InnerHomeFrame
          componentTitle={t("homePage.ourService")}>
          <OurService/>
        </InnerHomeFrame>
        <InnerHomeFrame
          componentTitle={t("homePage.newArticle")}>
          <NewArticles/>
        </InnerHomeFrame>
      </Layout>
    </div>
  )
}

export default Home