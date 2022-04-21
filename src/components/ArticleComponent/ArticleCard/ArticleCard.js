import React    from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css'

const Article = ({articleItem}) => {

  return (
    <div className='card-article__container'>
      <div className='card-article__item'>
        <div className='card-article__avatar'>
          <img 
            alt=''
            src={articleItem.blogImage}
            className='articles__image'/>
        </div>
        <div className='card-article__info'>
          <Link 
            to={`/blogs/${articleItem.blogURL}`}
            className='articles__links'
            state={{blogDocumentID : articleItem.id}}>
              <div className='article-item__name'>
                {articleItem.blogName}
              </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Article