import React, { useContext } from 'react';
import { Context } from "../../../../../../context/context";
import { FaArrowLeft } from 'react-icons/fa';

const GoBackButton = () => {
  const { setIsItTraining } = useContext(Context);

  const handleGoBack = () => {
    setIsItTraining("main");
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      margin: '24px 0'
    }}>
      <button 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: '240px',
          padding: '14px 28px',
          backgroundColor: '#00bcd4',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          margin: '20px',
          transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          boxShadow: '0 2px 8px rgba(0, 188, 212, 0.3)',
          ':hover': {
            backgroundColor: '#00acc1',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 188, 212, 0.4)'
          }
        }}
        onClick={handleGoBack}
      >
        <FaArrowLeft size={16} />
        Back to Main Menu
      </button>
    </div>
  );
};

export default GoBackButton;