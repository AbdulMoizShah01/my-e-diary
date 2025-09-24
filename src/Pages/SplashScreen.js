import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading process
  //   const loadingTimer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2500);

  //   // Auto-close after 3.5 seconds
  //   const closeTimer = setTimeout(() => {
  //     setIsVisible(false);
  //     setTimeout(() => onFinish(), 500);
  //   }, 3500);

  //   return () => {
  //     clearTimeout(loadingTimer);
  //     clearTimeout(closeTimer);
  //   };
  // }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-background">
        <div className="splash-pattern"></div>
        <div className="splash-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="splash-content">
        <div className="logo-container">
          <div className="logo-animation">
            <div className="logo-circle"></div>
            <div className="logo-icon">
              <img src='/logo.png' width={100} height={100}/>
            </div>
          </div>
          <h1 className="app-title">My Diary</h1>
          <p className="app-tagline">Capture your thoughts, preserve your memories</p>
        </div>
        
        <div className="loading-indicator">
          <div className="loading-bar">
            <div className={`loading-progress ${isLoading ? 'loading' : 'complete'}`}></div>
          </div>
          <div className="loading-text">
            {isLoading ? 'Loading your memories...' : 'Ready to explore!'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;