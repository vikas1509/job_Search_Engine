import React, { useState, useEffect, useContext } from 'react';
import './Proficiency.css';
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
const Proficiency = () => {
  const { selectedSkills, user } = useContext(DataContext);
  const [proficiencies, setProficiencies] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize proficiencies state with default values
    if (selectedSkills && selectedSkills.length > 0) {
      const initialProficiencies = {};
      selectedSkills.forEach(skill => {
        initialProficiencies[skill] = 2;
      });
      setProficiencies(initialProficiencies);
    }
  }, [selectedSkills]);

  const handleProficiencyChange = (skill, value) => {
    setProficiencies(prevProficiencies => ({
      ...prevProficiencies,
      [skill]: value,
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sliderChanged = Object.values(proficiencies).some(
      value => value !== 2
    );

    if (!sliderChanged) {
      setErrorMessage('Please adjust your level of skill.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('default_value', user);
    Object.entries(proficiencies).forEach(([skill, level], index) => {
      formData.append(`${index + 1}`, level);
    });

    try {
      const response = await fetch('http://localhost:8000/flask/proficiency_data', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/SuccesEmail');
        alert('Proficiencies submitted successfully.');
      } else {
        alert('Failed to submit proficiencies.');
      }
    } catch (error) {
      console.error('Error submitting the proficiencies:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>How good are you in:</h2>
      <form onSubmit={handleSubmit}>
        {selectedSkills && selectedSkills.length > 0 ? (
          selectedSkills.map((skill, index) => (
            <div key={index}>
              <div className="slider-label">{skill}</div>
              <input
                type="range"
                min="0"
                max="5"
                value={proficiencies[skill] || 2}
                className="slider"
                id={`slider${index}`}
                name={skill}
                onChange={(e) => handleProficiencyChange(skill, e.target.value)}
              />
              <div className="values">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading skills...</p>
        )}
        <input type="hidden" name="default_value" value={user} />
        <div className="submit-btn-wrapper">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            Submit
          </button>
        </div>
        {errorMessage && <p id="errorMessage" className="error-message">{errorMessage}</p>}
      </form>
      {isSubmitting && <div className="blur" id="blur"></div>}
      {isSubmitting && <div className="loader" id="loader"></div>}
    </div>
  );
};

export default Proficiency;
