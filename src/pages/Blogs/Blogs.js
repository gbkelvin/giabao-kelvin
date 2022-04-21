import React, { 
  useContext, useEffect, useState }   from 'react';
import { useTranslation }             from 'react-i18next';
import Article                        from '../../components/ArticleComponent/ArticleCard/ArticleCard';
import Layout                         from '../../components/LayoutComponent/Layout';
import CardItem                       from '../../components/LayoutComponent/customFrame/CardItem';
import * as FB_SERVICES               from '../../FirebaseServices/FirebaseService';
import { LanguageContext }            from '../../Context/LanguageContext';
import './Blogs.css'

const Blogs = () => {

  const {t, i18n} = useTranslation();
  const languageTypeValue = useContext(LanguageContext);

  const [ blogsList, setBlogsList] = useState([]);

  useEffect(() => { 
    FB_SERVICES.getBlogs(undefined ,languageTypeValue).then(blogItem => setBlogsList(blogItem));

  }, [languageTypeValue]);
  return (
    <div className='blogs__frame'>
      <Layout>
        <div className='blogs__header'>
          {t("blogsTitle")}
        </div>

        <div className='blogs__body'>
          {
            blogsList.map(
              (blogsItem, index) => {
                return (
                  <CardItem key={index}>
                    <Article articleItem={blogsItem}/>
                  </CardItem>
                )
              }
            )
          }
        </div>
      </Layout>
    </div>
  )
}

export default Blogs