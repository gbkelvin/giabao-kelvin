import React, { 
  useContext, useEffect, useState }   from 'react';
import Article                        from '../../../components/ArticleComponent/ArticleCard/ArticleCard';
import CardItem                       from '../../../components/LayoutComponent/customFrame/CardItem';
import { LanguageContext }            from '../../../Context/LanguageContext';
import * as FB_SERVICES               from '../../../FirebaseServices/FirebaseService';
import './NewArticles.css';

const NewArticles = () => {

  const languageTypeValue = useContext(LanguageContext);

  const [ newArticles, setNewArticle] = useState([]);

  useEffect(() => { 
    FB_SERVICES.getBlogs('OTP', languageTypeValue).then(blogItem => setNewArticle(blogItem));
  }, [languageTypeValue]);
  
  return (

    <div className='new-articles__container'>
      {
        newArticles.map(
            (newArticleItem, index) => {
              return (
                <CardItem key={index}>
                  <Article articleItem={newArticleItem}/>
                </CardItem>
                
              )
            }
          )
      }
    </div>
  )
}

export default NewArticles