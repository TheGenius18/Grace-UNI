import React, { useState } from 'react';
import './ArticlesHeader.css'; 

const ArticlesPage = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Advances in Cardiology 2024",
      content: "Recent breakthroughs in non-invasive heart treatments...",
      author: "Dr. Sarah Smith",
      topic: "Cardiology",
      likes: 24,
      isLiked: false,
      isLoved: false,
    },
    {
      id: 2,
      title: "Mental Health in Post-Pandemic Era",
      content: "How telehealth is transforming psychiatric care...",
      author: "Dr. James Lee",
      topic: "Psychiatry",
      likes: 15,
      isLiked: false,
      isLoved: true,
    },
  ]);

  const handleReaction = (id, reactionType) => {
    setArticles(articles.map(article => {
      if (article.id === id) {
        return {
          ...article,
          likes: reactionType === 'like' 
            ? (article.isLiked ? article.likes - 1 : article.likes + 1) 
            : article.likes,
          isLiked: reactionType === 'like' ? !article.isLiked : article.isLiked,
          isLoved: reactionType === 'love' ? !article.isLoved : article.isLoved,
        };
      }
      return article;
    }));
  };

  return (
    <div className="articles-page">
      <h1>Medical Articles</h1>
      <div className="articles-grid">
        {articles.map(article => (
          <div key={article.id} className="article-box">
            <div className="article-header">
              <span className="article-topic">{article.topic}</span>
              <h2>{article.title}</h2>
              <p className="article-author">By {article.author}</p>
            </div>
            <div className="article-content">
              <p>{article.content}</p>
            </div>
            <div className="article-footer">
              <button 
                onClick={() => handleReaction(article.id, 'like')}
                className={`reaction-btn ${article.isLiked ? 'active' : ''}`}
              >
                👍 Like ({article.likes})
              </button>
              <button 
                onClick={() => handleReaction(article.id, 'love')}
                className={`reaction-btn ${article.isLoved ? 'active' : ''}`}
              >
                ❤️ Love
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;