import React, { useState } from 'react';
import './DepressionInfo.css';

const DepressionInfo = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="depression-info-container">
      <h1 className="main-title">Understanding Depression</h1>
      
      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'diagnosis' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagnosis')}
        >
          Diagnosis
        </button>
        <button 
          className={`tab-button ${activeTab === 'treatment' ? 'active' : ''}`}
          onClick={() => setActiveTab('treatment')}
        >
          Treatment
        </button>
        <button 
          className={`tab-button ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          Therapy Tools
        </button>
      </div>
      
      <div className="content-area">
        {activeTab === 'overview' && (
          <div className="tab-content">
            <h2>What is Depression?</h2>
            <p>
              Depression is a common but serious mood disorder that causes severe symptoms affecting how you feel, think, and handle daily activities. It's more than just feeling "down" - it's a persistent condition that can last for weeks, months, or even years without proper treatment.
            </p>
            
            <div className="symptoms-section">
              <h3>Common Symptoms:</h3>
              <ul>
                <li>Persistent sad, anxious, or "empty" mood</li>
                <li>Feelings of hopelessness or pessimism</li>
                <li>Irritability</li>
                <li>Loss of interest in hobbies and activities</li>
                <li>Decreased energy or fatigue</li>
                <li>Difficulty concentrating or making decisions</li>
                <li>Sleep disturbances (insomnia or oversleeping)</li>
                <li>Appetite or weight changes</li>
                <li>Thoughts of death or suicide</li>
              </ul>
            </div>
            
            <div className="types-section">
              <h3>Types of Depression:</h3>
              <div className="type-card">
                <h4>Major Depressive Disorder (MDD)</h4>
                <p>Severe symptoms that interfere with work, sleep, study, eating, and enjoyment of life.</p>
              </div>
              <div className="type-card">
                <h4>Persistent Depressive Disorder (Dysthymia)</h4>
                <p>Depressed mood lasting for at least two years along with other depression symptoms.</p>
              </div>
              <div className="type-card">
                <h4>Seasonal Affective Disorder (SAD)</h4>
                <p>Depression that occurs during winter months when there's less natural sunlight.</p>
              </div>
              <div className="type-card">
                <h4>Postpartum Depression</h4>
                <p>Depression that occurs after childbirth, more severe than the "baby blues."</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'diagnosis' && (
          <div className="tab-content">
            <h2>Diagnosing Depression</h2>
            <p>
              Depression is diagnosed through a combination of clinical evaluation and specific diagnostic criteria. There's no single test for depression, but healthcare professionals use several methods to assess your condition.
            </p>
            
            <div className="diagnosis-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Physical Examination</h3>
                  <p>Your doctor may do a physical exam and ask in-depth questions about your health to determine what might be causing your depression.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Lab Tests</h3>
                  <p>Blood tests might be done to check for other medical conditions that may cause depressive symptoms (like thyroid problems or vitamin deficiencies).</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Psychological Evaluation</h3>
                  <p>A mental health professional will ask about your symptoms, thoughts, feelings, and behavior patterns. You may be asked to fill out a questionnaire.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>DSM-5 Criteria</h3>
                  <p>Your doctor may use the criteria for depression listed in the Diagnostic and Statistical Manual of Mental Disorders (DSM-5).</p>
                </div>
              </div>
            </div>
            
            <div className="diagnosis-criteria">
              <h3>DSM-5 Criteria for Major Depressive Disorder</h3>
              <p>To be diagnosed with MDD, you must have five or more of the following symptoms during the same 2-week period, and at least one of the symptoms should be either (1) depressed mood or (2) loss of interest or pleasure:</p>
              <ol>
                <li>Depressed mood most of the day, nearly every day</li>
                <li>Markedly diminished interest or pleasure in all, or almost all, activities</li>
                <li>Significant weight loss or gain, or decrease/increase in appetite</li>
                <li>Insomnia or hypersomnia</li>
                <li>Psychomotor agitation or retardation</li>
                <li>Fatigue or loss of energy</li>
                <li>Feelings of worthlessness or excessive/inappropriate guilt</li>
                <li>Diminished ability to think or concentrate</li>
                <li>Recurrent thoughts of death, suicidal ideation, or suicide attempt</li>
              </ol>
            </div>
          </div>
        )}
        
        {activeTab === 'treatment' && (
          <div className="tab-content">
            <h2>Treatment Options for Depression</h2>
            <p>
              Depression is among the most treatable of mental disorders. Between 80% and 90% of people with depression eventually respond well to treatment. Almost all patients gain some relief from their symptoms.
            </p>
            
            <div className="treatment-options">
              <div className="option-card">
                <div className="option-icon">💊</div>
                <h3>Medications</h3>
                <p>Antidepressants can help modify brain chemistry. They may take 2-4 weeks to work and often need to be combined with therapy.</p>
                <div className="option-details">
                  <h4>Common Types:</h4>
                  <ul>
                    <li>SSRIs (e.g., Prozac, Zoloft)</li>
                    <li>SNRIs (e.g., Cymbalta, Effexor)</li>
                    <li>Atypical antidepressants</li>
                    <li>Tricyclic antidepressants</li>
                    <li>MAOIs</li>
                  </ul>
                </div>
              </div>
              
              <div className="option-card">
                <div className="option-icon">🧠</div>
                <h3>Psychotherapy</h3>
                <p>Also called "talk therapy," psychotherapy can help people with depression understand their illness and develop coping strategies.</p>
                <div className="option-details">
                  <h4>Effective Approaches:</h4>
                  <ul>
                    <li>Cognitive Behavioral Therapy (CBT)</li>
                    <li>Interpersonal Therapy (IPT)</li>
                    <li>Psychodynamic Therapy</li>
                    <li>Problem-Solving Therapy</li>
                  </ul>
                </div>
              </div>
              
              <div className="option-card">
                <div className="option-icon">⚡</div>
                <h3>Brain Stimulation Therapies</h3>
                <p>Used when other treatments haven't worked, these include electroconvulsive therapy (ECT) and repetitive transcranial magnetic stimulation (rTMS).</p>
              </div>
              
              <div className="option-card">
                <div className="option-icon">🌞</div>
                <h3>Lifestyle Changes</h3>
                <p>Regular exercise, healthy diet, good sleep habits, and stress reduction can complement other treatments.</p>
              </div>
            </div>
            
            <div className="treatment-process">
              <h3>How Treatment Works</h3>
              <p>Effective treatment for depression typically involves several mechanisms working together:</p>
              
              <div className="process-steps">
                <div className="process-step">
                  <h4>1. Neurochemical Regulation</h4>
                  <p>Medications help balance neurotransmitters like serotonin, dopamine, and norepinephrine that affect mood and emotion.</p>
                </div>
                
                <div className="process-step">
                  <h4>2. Cognitive Restructuring</h4>
                  <p>Therapy helps identify and change negative thought patterns and beliefs that contribute to depression.</p>
                </div>
                
                <div className="process-step">
                  <h4>3. Behavioral Activation</h4>
                  <p>Increasing engagement in positive activities helps counteract the withdrawal and isolation common in depression.</p>
                </div>
                
                <div className="process-step">
                  <h4>4. Emotional Processing</h4>
                  <p>Therapy provides a safe space to process difficult emotions and develop healthier coping mechanisms.</p>
                </div>
                
                <div className="process-step">
                  <h4>5. Skill Building</h4>
                  <p>Patients learn practical skills for stress management, problem-solving, and improving relationships.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tools' && (
          <div className="tab-content">
            <h2>Therapy Tools for Depression</h2>
            <p>
              These evidence-based tools can help manage depression symptoms and complement professional treatment. Regular practice can lead to significant improvements in mood and outlook.
            </p>
            
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">📝</div>
                  <h3>Thought Diary</h3>
                </div>
                <div className="tool-content">
                  <p>A structured way to track negative thoughts, identify patterns, and challenge cognitive distortions.</p>
                  <h4>How it helps:</h4>
                  <ul>
                    <li>Increases awareness of thought patterns</li>
                    <li>Provides distance from negative thoughts</li>
                    <li>Helps identify triggers</li>
                    <li>Facilitates cognitive restructuring</li>
                  </ul>
                  <h4>How to use:</h4>
                  <ol>
                    <li>Record the situation that triggered a negative emotion</li>
                    <li>Note the automatic thought that arose</li>
                    <li>Identify the emotion and its intensity</li>
                    <li>Challenge the thought with evidence</li>
                    <li>Develop a more balanced perspective</li>
                  </ol>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">🗣️</div>
                  <h3>Self-Dialogue</h3>
                </div>
                <div className="tool-content">
                  <p>Conscious practice of positive self-talk to counter negative internal narratives common in depression.</p>
                  <h4>How it helps:</h4>
                  <ul>
                    <li>Counters negative self-beliefs</li>
                    <li>Builds self-compassion</li>
                    <li>Reinforces positive neural pathways</li>
                    <li>Improves self-esteem over time</li>
                  </ul>
                  <h4>Techniques:</h4>
                  <ul>
                    <li><strong>The 3 Cs:</strong> Catch negative thoughts, Check their validity, Change them to more realistic statements</li>
                    <li><strong>Compassionate self-talk:</strong> Speak to yourself as you would to a dear friend</li>
                    <li><strong>Affirmations:</strong> Short positive statements repeated regularly</li>
                  </ul>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">🌬️</div>
                  <h3>Breathing Exercises</h3>
                </div>
                <div className="tool-content">
                  <p>Intentional breathing techniques that activate the body's relaxation response and reduce stress.</p>
                  <h4>How it helps:</h4>
                  <ul>
                    <li>Reduces physiological symptoms of anxiety</li>
                    <li>Lowers cortisol levels</li>
                    <li>Increases oxygen flow to the brain</li>
                    <li>Provides a quick coping mechanism</li>
                  </ul>
                  <h4>Exercises to try:</h4>
                  <ol>
                    <li><strong>4-7-8 Breathing:</strong> Inhale for 4 sec, hold for 7 sec, exhale for 8 sec</li>
                    <li><strong>Box Breathing:</strong> Inhale, hold, exhale, hold - each for 4 counts</li>
                    <li><strong>Diaphragmatic Breathing:</strong> Deep belly breathing</li>
                  </ol>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">🧘</div>
                  <h3>Mindfulness Meditation</h3>
                </div>
                <div className="tool-content">
                  <p>Practice of focusing attention on the present moment without judgment.</p>
                  <h4>How it helps:</h4>
                  <ul>
                    <li>Reduces rumination (repetitive negative thinking)</li>
                    <li>Increases emotional regulation</li>
                    <li>Changes brain structure related to emotional processing</li>
                    <li>Enhances self-awareness</li>
                  </ul>
                  <h4>Simple practice:</h4>
                  <ol>
                    <li>Find a quiet space and sit comfortably</li>
                    <li>Focus on your breath or a chosen anchor</li>
                    <li>When your mind wanders, gently return focus</li>
                    <li>Start with 5-10 minutes daily</li>
                  </ol>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">💪</div>
                  <h3>Progressive Muscle Relaxation</h3>
                </div>
                <div className="tool-content">
                  <p>Technique of tensing and relaxing muscle groups to reduce physical tension.</p>
                  <h4>How it helps:</h4>
                  <ul>
                    <li>Reduces physical symptoms of stress</li>
                    <li>Increases body awareness</li>
                    <li>Promotes better sleep</li>
                    <li>Creates relaxation response</li>
                  </ul>
                  <h4>Steps:</h4>
                  <ol>
                    <li>Start with your feet and work upward</li>
                    <li>Tense each muscle group for 5-7 seconds</li>
                    <li>Release suddenly and notice the relaxation</li>
                    <li>Continue through all major muscle groups</li>
                  </ol>
                </div>
              </div>
              
              <div className="tool-card">
                <div className="tool-header">
                  <div className="tool-icon">🎵</div>
                  <h3>Guided Imagery & Music</h3>
                </div>
                <div className="tool-content">
                  <p>Using visualization and calming music to promote relaxation and positive mood states.</p>
                  <h4>How it helps:</h4>
                  <ul>
                    <li>Distracts from negative thoughts</li>
                    <li>Triggers positive emotional responses</li>
                    <li>Reduces stress hormone levels</li>
                    <li>Enhances relaxation</li>
                  </ul>
                  <h4>How to practice:</h4>
                  <ol>
                    <li>Choose calming instrumental music</li>
                    <li>Close your eyes and visualize a peaceful place</li>
                    <li>Engage all senses in the visualization</li>
                    <li>Practice for 10-15 minutes</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="tools-tips">
              <h3>Getting the Most from Therapy Tools</h3>
              <div className="tips-grid">
                <div className="tip">
                  <h4>Consistency is Key</h4>
                  <p>Regular practice (daily if possible) yields better results than occasional use.</p>
                </div>
                <div className="tip">
                  <h4>Combine Tools</h4>
                  <p>Using multiple tools together (e.g., breathing + mindfulness) can enhance benefits.</p>
                </div>
                <div className="tip">
                  <h4>Track Progress</h4>
                  <p>Keep a simple log of your mood before and after using tools to see what works best.</p>
                </div>
                <div className="tip">
                  <h4>Be Patient</h4>
                  <p>Benefits often build gradually over weeks of consistent practice.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepressionInfo;