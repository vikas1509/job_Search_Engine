import React, { useState, useEffect, useContext } from 'react';
import "./first-page.css";
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import useBeforeUnload from "../useBeforeUnload/useBeforeUnload"; // Import the custom hook
import useBlocker from '../useBlocker/useBlocker';
import Loader from '../../Components/Loader/Loader';

const FirstPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    job_title: '',
    resume: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { topSkills, setTopSkills, user, setUser } = useContext(DataContext);
  
  useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');
  useBlocker('Are you sure you want to leave this page?');

  useEffect(() => {
    // Load form data from local storage
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  useEffect(() => {
    // Validate form: check if all fields are filled
    const allFieldsFilled = Object.values(formData).every((field) => field !== '' && field !== null);
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };
    setFormData(updatedFormData);

    // Update local storage only if email changes
    if (name === 'mail') {
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mail', formData.mail);
    formDataToSend.append('job_title', formData.job_title);
    formDataToSend.append('resume', formData.resume);

    console.log([...formDataToSend.entries()]); // Log the FormData entries to check its content
    console.log(typeof formDataToSend, "formdatatype");
    console.log(formDataToSend);

    try {
      const response = await fetch('http://127.0.0.1:8000/flask/get_data', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data[0], "top skills");
        setTopSkills(data[0]);

        // Update user only if different from the one stored in session storage
        const newUser = data[1];
        if (newUser !== user) {
          setUser(newUser);
        }

        alert('Application submitted successfully!');
        navigate('/top-skills'); // Navigate after successful submission
      } else {
        const errorData = await response.json();
        alert('Failed to submit the application: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error submitting the application:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='overlay'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
      <div  className="firstpage-container">
      <h1>Job Application</h1>
          <form onSubmit={handleSubmit} id="jobApplicationForm">
            <div className="firstpage-form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" className="firstpage-input-field" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="firstpage-form-group">
              <label htmlFor="mail">Email</label>
              <input type="email" id="mail" name="mail" className="firstpage-input-field" value={formData.mail} onChange={handleChange} required />
            </div>
            <div className="firstpage-form-group">
              <label htmlFor="job_title">Job title</label>
              <input type="text" id="job_title" name="job_title" className="firstpage-input-field" value={formData.job_title} onChange={handleChange} required />
            </div>
            <div className="firstpage-form-group">
              <label htmlFor="resume">Resume (PDF)</label>
              <input type="file" id="resume" name="resume" className="firstpage-input-field" accept=".pdf" onChange={handleChange} required />
            </div>
            <button type="submit" className="firstpage-submit-btn" disabled={!isFormValid}>
              Submit Application
            </button>
          </form>
      </div>
        </>
      )}
    </div>
  );
};

export default FirstPage;
