import React from 'react';
import './TherapistList.css';

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cognitive Behavioral Therapy",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Specializes in depression and anxiety disorders with 10 years of experience."
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psychodynamic Therapy",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Focuses on long-term depression treatment and trauma recovery."
  },
  {
    id: 3,
    name: "Dr. Amina Patel",
    specialty: "Mindfulness-Based Therapy",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Combines traditional therapy with mindfulness techniques for holistic healing."
  },
  {
    id: 4,
    name: "Dr. Robert Williams",
    specialty: "Interpersonal Therapy",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Specializes in depression related to relationship issues and life transitions."
  },
  {
    id: 5,
    name: "Dr. Emily Rodriguez",
    specialty: "Art Therapy",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Uses creative expression to help patients process emotions and trauma."
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Solution-Focused Therapy",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    description: "Goal-oriented approach to help patients find practical solutions."
  }
];

const TherapistList = () => {
  const [expandedTherapist, setExpandedTherapist] = React.useState(null);

  const toggleExpand = (id) => {
    if (expandedTherapist === id) {
      setExpandedTherapist(null);
    } else {
      setExpandedTherapist(id);
    }
  };

  return (
    <div className="therapist-list-container">
      <h2 className="section-title">Our Professional Therapists</h2>
      <p className="section-subtitle">Find the right specialist for your needs</p>
      
      <div className="therapists-grid">
        {therapists.map((therapist) => (
          <div 
            key={therapist.id} 
            className={`therapist-card ${expandedTherapist === therapist.id ? 'expanded' : ''}`}
          >
            <div className="therapist-photo-container">
              <img 
                src={therapist.photo} 
                alt={therapist.name} 
                className="therapist-photo" 
              />
            </div>
            <div className="therapist-info">
              <h3 className="therapist-name">{therapist.name}</h3>
              <p className="therapist-specialty">{therapist.specialty}</p>
              
              {expandedTherapist === therapist.id && (
                <div className="therapist-description">
                  <p>{therapist.description}</p>
                </div>
              )}
              
              <button 
                className="more-info-btn"
                onClick={() => toggleExpand(therapist.id)}
              >
                {expandedTherapist === therapist.id ? 'Show Less' : 'More Info'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistList;