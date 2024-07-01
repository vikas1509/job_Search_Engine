import React, { useContext, useEffect } from 'react';
import './TopSkills.css';
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import FullScreenContext from '../../FullscreenContext/FullScreenContext';
import useBeforeUnload from '../useBeforeUnload/useBeforeUnload';
import useBlocker from '../useBlocker/useBlocker';

const TopSkills = () => {
  const navigate = useNavigate();
  const { topSkills, selectedSkills, setSelectedSkills, user } = useContext(DataContext);
  const { enterFullScreen } = useContext(FullScreenContext);

  const hasUnsavedChanges = selectedSkills.length > 0;
  const confirmationMessage = 'Are you sure you want to leave this page? You have unsaved changes.';

  useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');
  useBlocker(confirmationMessage, hasUnsavedChanges);

  useEffect(() => {
    // Replace the current entry in the history stack with the current URL
    navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prevSelectedSkills) => {
      if (prevSelectedSkills.includes(skill)) {
        return prevSelectedSkills.filter((s) => s !== skill);
      }
      if (prevSelectedSkills.length < 5) {
        return [...prevSelectedSkills, skill];
      }
      return prevSelectedSkills;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSkills.length !== 5) {
      alert('Please select exactly 5 skills.');
      return;
    }

    const formData = new FormData();
    formData.append('name', user);
    selectedSkills.forEach(skill => formData.append('skill', skill));

    try {
      const response = await fetch('http://localhost:8000/flask/top_skills', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`Submitted skills: ${selectedSkills.join(', ')}`);
        // Navigate to the next page and replace the current entry to prevent back navigation
        navigate('/proficiency', { replace: true });
      } else {
        alert('Failed to submit the skills.');
      }
    } catch (error) {
      console.error('Error submitting the skills:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="top-skills-container">
      <h1 className='top-skills-heading'>Select Your Top 5 Skills</h1>
      <div className="form-scroll-container">
        <form className="top-skills-form" onSubmit={handleSubmit}>
          {topSkills.map((skill) => (
            <div className="top-skills-item" key={skill}>
              <input
                type="checkbox"
                name="skill"
                value={skill}
                id={skill}
                checked={selectedSkills.includes(skill)}
                onChange={() => handleCheckboxChange(skill)}
                disabled={selectedSkills.length === 5 && !selectedSkills.includes(skill)}
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
          <input type="hidden" name="name" value={user} />
          <div className="top-skills-submit-btn-wrapper">
            <button type="submit" className="top-skills-submit-btn" id="submitBtn" disabled={selectedSkills.length !== 5}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopSkills;
