import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './SuccessEmail.css'; // Assuming you want to keep the styles in a separate CSS file
import DataContext from '../../context/DataContext';

const SuccessEmail = () => {
  const { user } = useContext(DataContext);

  return (
    <div className="container">
      <h1>Email Sent!</h1>
      <p>
        A confirmation email containing the skill test link has been sent to
        your inbox.
      </p>
      <p>Please check your inbox and follow the instructions.</p>
      <p>If you haven't received the email, please check your spam folder.</p>
      <p>
        Once you've received the email,
        <Link
          className="inbox-link"
          to={`/SkillTest?user=${user}`}
        >
          click here
        </Link>
        to proceed to the test.
      </p>
    </div>
  );
};

export default SuccessEmail;
