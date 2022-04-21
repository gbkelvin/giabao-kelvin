import React, { 
  useContext, 
  useEffect, 
  useState }                  from 'react'
import { Link, useLocation }  from 'react-router-dom';
import { FiChevronsRight }    from 'react-icons/fi';
import { useTranslation }     from 'react-i18next';
import Layout                 from '../../LayoutComponent/Layout';
import { LanguageContext }    from '../../../Context/LanguageContext';
import * as FB_SERVICES       from '../../../FirebaseServices/FirebaseService';
import './ArticleDetail.css';


const ArticleDetail = () => {

  const {t, i18n} = useTranslation("translation");
  const detailArticleLocation   = useLocation();
  const detailArticleProps      = detailArticleLocation.state;

  const languageTypeValue = useContext(LanguageContext);

  const [blogDetail   , setBlogDetail   ] = useState({});
  const [articleDetail, setArticleDetail] = useState([]);

  useEffect(() => {
    FB_SERVICES.getArticleByID(detailArticleProps, languageTypeValue)
    .then(articleItem => {
      setBlogDetail(articleItem)
      setArticleDetail(articleItem.articleList)
      
    });
  }, [languageTypeValue])
  
  return (
    <div className='article-detail__frame'>
      <Layout>
        <div className='article-detail__header'>
          <div className='article-detail__links-container'>
            <Link to='/' className='article-detail__links link-to'>
              {t("nav-bar.home")}
            </Link>
            <div className='right-arrow__body'>
              <FiChevronsRight/>
            </div>
            <Link to='/blogs' className='article-detail__links link-to'>
              {t("nav-bar.blogs")}
            </Link>
            <div className='right-arrow__body'>
              <FiChevronsRight/>
            </div>
            <div className='article-detail__links article-url'>
              {blogDetail.blogName}
            </div>
          </div>
          <div className='article-detail__title'>
          {blogDetail.blogName}
          </div>
        </div>

        <div className='article-detail__body'>
          <div className='article-body__detail'>
            <div className='article-body__image'>
              <img
                alt=''
                className='image__blogs'
                src={blogDetail.blogImage}/>
            </div>
            {
              articleDetail.map((Article, index) => {
                return (
                  <div 
                    key={index}
                    className='article-body__content'>
                    <div className='article-body__title'>
                    {Article.articleTitle}
                    </div>
                    <div className='article-body__sub'>
                      {
                        Article.articleContent.map((item, index) => {
                          return (
                            <p key={index}>{item}</p>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Layout>
    </div>
  )

}

export default ArticleDetail