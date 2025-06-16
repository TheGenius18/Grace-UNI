import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PatientForm from '../FillUserInfo/PatientForm';
import TherapistForm from '../FillUserInfo/TherapistForm';

const InformationPage = () => {
  const [authState, setAuthState] = useState({
    loading: true,
    userType: null,
    error: null
  });
  const navigate = useNavigate();

  // Enhanced token retrieval with fallbacks
  const getAuthToken = () => {
    return (
      localStorage.getItem('access_token')
    );
  };

  const fetchUserData = async () => {
    const token = getAuthToken();
    
    if (!token) {
      setAuthState({
        loading: false,
        userType: null,
        error: 'No authentication token found'
      });
      navigate('/login', { replace: true });
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      if (!response.data?.user_type) {
        throw new Error('User type not found in response');
      }

      setAuthState({
        loading: false,
        userType: response.data.user_type,
        error: null
      });

    } catch (error) {
      console.error('User data fetch error:', error);
      
      // Clear invalid token
      localStorage.removeItem('access_token');
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('access_token');

      let errorMessage = 'Authentication failed';
      
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Session expired. Please login again.';
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }

      setAuthState({
        loading: false,
        userType: null,
        error: errorMessage
      });

      navigate('/login', { 
        state: { error: errorMessage },
        replace: true 
      });
    }
  };

  useEffect(() => {
    // Add slight delay to ensure token is available after login redirect
    const timer = setTimeout(fetchUserData, 100);
    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (authState.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-3 text-gray-600">Verifying your session...</p>
        </div>
      </div>
    );
  }

  // Error state (should be redirected but kept as fallback)
  if (authState.error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg">
        <h3 className="text-lg font-medium text-red-800">Authentication Error</h3>
        <p className="mt-2 text-red-600">{authState.error}</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Success states
  switch (authState.userType) {
    case 'patient':
      return <PatientForm />;
    case 'therapist':
      return <TherapistForm />;
    default:
      return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-yellow-50 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800">Account Issue</h3>
          <p className="mt-2 text-yellow-600">
            Your account type isn't properly configured.
          </p>
          <div className="mt-4 space-x-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              Refresh
            </button>
          </div>
        </div>
      );
  }
};

export default InformationPage;