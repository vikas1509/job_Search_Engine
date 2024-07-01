// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// const useBlocker = (message, hasUnsavedChanges) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (hasUnsavedChanges) {
//         e.preventDefault();
//         e.returnValue = message;
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     const handlePopState = (e) => {
//       if (hasUnsavedChanges) {
//         const confirmLeave = window.confirm(message);
//         if (!confirmLeave) {
//           window.history.pushState(null, '', location.pathname);
//         } else {
//           window.history.back();
//         }
//       }
//     };

//     window.addEventListener('popstate', handlePopState);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, [hasUnsavedChanges, message, location.pathname]);

//   // Push a dummy state to prevent back navigation on initial load
//   useEffect(() => {
//     window.history.pushState(null, '', window.location.pathname);
//   }, []);
// };

// export default useBlocker;
// useBlocker.js
// useBlocker.js
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useBlocker = (message, hasUnsavedChanges) => {
  const navigate = useNavigate();
  const location = useLocation();
  const blockNavigation = useRef(false);

  useEffect(() => {
    const handlePopState = (e) => {
      if (hasUnsavedChanges) {
        if (blockNavigation.current) {
          // If the navigation is already blocked, reset it and push the state back
          blockNavigation.current = false;
          window.history.pushState(null, '', location.pathname);
        } else {
          // const confirmLeave = window.confirm(message);
          // if (!confirmLeave) {
            // Prevent navigation and push the state back to current URL
            blockNavigation.current = true;
            window.history.pushState(null, '', location.pathname);
          // } else {
          //   blockNavigation.current = false;
          //   window.history.back(); // Allow navigation if confirmed
          // }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [hasUnsavedChanges, message, location.pathname]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, message]);

  // Push a dummy state to prevent back navigation on initial load
  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname);
  }, []);
};

export default useBlocker;
