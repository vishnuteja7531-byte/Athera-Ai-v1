import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate('/auth/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-surface p-8 rounded-lg shadow-sm border border-gray-100 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">Redirecting...</h2>
        <p className="text-muted">Redirecting to the login page</p>
      </div>
    </div>
  );
};

export default Landing;
