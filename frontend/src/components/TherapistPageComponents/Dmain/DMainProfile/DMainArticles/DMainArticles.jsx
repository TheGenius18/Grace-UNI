import React, { useState } from 'react';
import './DMainArticles.css';

const DoctorArticlesView = () => {
  const [showArticles, setShowArticles] = useState(false);
  
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Diabetes Management in 2024",
      content: "New insulin protocols show 30% better outcomes...",
      publishedDate: "2024-05-15",
      likes: 42
    },
    {
      id: 2,
      title: "Minimally Invasive Knee Surgery",
      content: "Robotic-assisted techniques reduce recovery time...",
      publishedDate: "2024-04-22",
      likes: 28
    }
  ]);

  const handleViewToggle = () => {
    setShowArticles(!showArticles);
  };

  return (
    <div className="doctor-articles-container">
      {!showArticles ? (
        <div 
          className="dashboard-placeholder" 
          onClick={handleViewToggle}
        >
          <h3>Your Medical Insights</h3>
          <p>Click here to view/manage your published articles</p>
        </div>
      ) : (
        <div className="articles-management-view">
          <div className="articles-header">
            <h2>Your Published Articles</h2>
            <button 
              className="publish-new-btn"
              onClick={() => alert("Open article submission form")}
            >
              ✍️ Publish New Article
            </button>
          </div>

          <div className="articles-list">
            {articles.length > 0 ? (
              articles.map(article => (
                <div key={article.id} className="article-card">
                  <h3>{article.title}</h3>
                  <p className="article-date">
                    Published: {article.publishedDate} • ❤️ {article.likes} likes
                  </p>
                  <p className="article-content-preview">
                    {article.content.substring(0, 100)}...
                  </p>
                  <div className="article-actions">
                    <button>Edit</button>
                    <button>Delete</button>
                    <button>View Stats</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-articles">You haven't published any articles yet.</p>
            )}
          </div>

          <button 
            className="back-to-dashboard"
            onClick={handleViewToggle}
          >
            ← Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorArticlesView;