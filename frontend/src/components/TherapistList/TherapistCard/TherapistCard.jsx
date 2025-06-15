import React, { useState } from 'react';
import './TherapistCard.css';

const TherapistCard = ({ therapist }) => {
  const [showArticles, setShowArticles] = useState(false);

  return (
    <div className="therapist-card">
      <div className="card-header">
        <div className="profile-section">
          <div className="avatar-container">
            <img src={therapist.photo} alt={therapist.name} className="avatar" />
            <div className="rank-badge">{therapist.rank}</div>
          </div>
          <div className="basic-info">
            <h2 className="name">{therapist.name}</h2>
            <p className="title">{therapist.professionalStatus}</p>
            <div className="specialty">{therapist.specialization}</div>
          </div>
        </div>
        
        <div className="meta-info">
          <div className="meta-item">
            <span className="meta-label">Therapy Approach:</span>
            <span className="meta-value">{therapist.therapyType}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Experience:</span>
            <span className="meta-value">{therapist.experience} years</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Languages:</span>
            <span className="meta-value">{therapist.languages.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="info-grid">
          <div className="info-section personal-info">
            <h3 className="section-title">Personal Details</h3>
            <div className="info-row">
              <span className="info-label">Gender:</span>
              <span className="info-value">{therapist.gender}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Age Range:</span>
              <span className="info-value">{therapist.ageRange}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Region:</span>
              <span className="info-value">{therapist.region}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Marital Status:</span>
              <span className="info-value">{therapist.maritalStatus}</span>
            </div>
          </div>

          <div className="info-section professional-info">
            <h3 className="section-title">Professional Background</h3>
            <div className="info-row">
              <span className="info-label">Education:</span>
              <span className="info-value">{therapist.education}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Licenses:</span>
              <span className="info-value">{therapist.licenses.join(', ')}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Approach:</span>
              <span className="info-value">{therapist.therapyApproach}</span>
            </div>
          </div>
        </div>

        <div className="history-section">
          <h3 className="section-title">Professional History</h3>
          <p className="history-text">{therapist.history}</p>
        </div>

        <div className="articles-section">
          <div className="articles-header" onClick={() => setShowArticles(!showArticles)}>
            <h3 className="section-title">Published Articles</h3>
            <span className="toggle-icon">
              {showArticles ? '▲' : '▼'}
            </span>
          </div>
          
          {showArticles && (
            <ul className="articles-list">
              {therapist.articles.map((article, index) => (
                <li key={index} className="article-item">
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="article-link">
                    <span className="article-title">{article.title}</span>
                    {article.year && <span className="article-year">({article.year})</span>}
                    {article.journal && <span className="article-journal">{article.journal}</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// Sample data
TherapistCard.defaultProps = {
  therapist: {
    id: 1,
    name: "Dr. Sarah Johnson",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    rank: "★★★★★",
    professionalStatus: "Licensed Clinical Psychologist",
    specialization: "Depression & Anxiety Disorders",
    therapyType: "Cognitive Behavioral Therapy (CBT)",
    experience: 12,
    languages: ["English", "Spanish"],
    gender: "Female",
    ageRange: "35-45",
    region: "North America",
    maritalStatus: "Married",
    education: "PhD in Clinical Psychology, Stanford University",
    licenses: ["State Board of Psychology", "National Register of Health Service Psychologists"],
    therapyApproach: "Evidence-based, Client-centered, Integrative",
    history: "Dr. Johnson has 12 years of experience treating depression and anxiety disorders. She completed her clinical training at Massachusetts General Hospital and has worked in various settings including hospitals, private practice, and university counseling centers. Her research focuses on innovative approaches to treatment-resistant depression.",
    articles: [
      {
        title: "Cognitive Approaches to Treatment-Resistant Depression",
        year: 2020,
        journal: "Journal of Clinical Psychology",
        link: "#"
      },
      {
        title: "Mindfulness Techniques in CBT for Depression",
        year: 2018,
        journal: "American Psychologist",
        link: "#"
      },
      {
        title: "The Role of Sleep in Depression Recovery",
        year: 2016,
        journal: "Journal of Affective Disorders",
        link: "#"
      },
      {
        title: "Integrating Technology in Depression Treatment",
        year: 2015,
        link: "#"
      }
    ]
  }
};

export default TherapistCard;