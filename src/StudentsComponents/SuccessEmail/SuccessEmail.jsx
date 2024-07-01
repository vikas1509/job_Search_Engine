import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SuccessEmail.css'; // Import the CSS file
import DataContext from '../../context/DataContext';
import useBeforeUnload from "../useBeforeUnload/useBeforeUnload"; // Import the custom hook
import useBlocker from '../useBlocker/useBlocker';
import Loader from '../../Components/Loader/Loader';

const SuccessEmail = () => {
  const { user } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const fullScreenRef = useRef(null);

  useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');
  // useBlocker('Are you sure you want to leave this page?');
  const confirmationMessage = 'Are you sure you want to leave this page? You have unsaved changes.';
  useBlocker(confirmationMessage, true);
  const handleLoading = () => {
    setIsLoading(true);

    // Simulate loading delay (remove this in actual implementation)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Example: 2 seconds
  };

  return (
    <div className="successEmailContainer" ref={fullScreenRef}>
      {isLoading && <Loader />} {/* Render Loader when isLoading is true */}
      <h1 className="successEmailHeading">Email Sent!</h1>
      <p className="successEmailText">
        A confirmation email containing the skill test link has been sent to your inbox.
      </p>
      <p className="successEmailText">Please check your inbox and follow the instructions.</p>
      <p className="successEmailText">If you haven't received the email, please check your spam folder.</p>
      <p className="successEmailText">
        Once you've received the email,
        <Link
          className="successEmailLink"
          to={`/SkillTest?user=${user}`}
          onClick={handleLoading} // Trigger loading state on link click
        >
          click here
        </Link>
        to proceed to the test.
      </p>
    </div>
  );
};

export default SuccessEmail;
