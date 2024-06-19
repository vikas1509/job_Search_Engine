import React, { useState, useEffect, useContext } from 'react';
import "./first-page.css";
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    job_title: '',
    resume: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const { topSkills, setTopSkills,setUser } = useContext(DataContext);

  useEffect(() => {
    // Validate form: check if all fields are filled
    const allFieldsFilled = Object.values(formData).every((field) => field !== '' && field !== null);
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('mail', formData.mail);
    formDataToSend.append('job_title', formData.job_title);
    formDataToSend.append('resume', formData.resume);

    console.log([...formDataToSend.entries()]); // Log the FormData entries to check its content
   console.log(typeof(formDataToSend),"formdatatype")
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
        console.log(data[1],"userName");
        setUser(data[1]);
        alert('Application submitted successfully!');
        navigate('/top-skills'); // Navigate after successful submission
      } else {
        const errorData = await response.json();
        alert('Failed to submit the application: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error submitting the application:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Job Application</h1>
      <form onSubmit={handleSubmit} id="jobApplicationForm">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Email</label>
          <input type="email" id="mail" name="mail" value={formData.mail} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="job_title">Job title</label>
          <input type="text" id="job_title" name="job_title" value={formData.job_title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Resume (PDF)</label>
          <input type="file" id="resume" name="resume" accept=".pdf" onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default FirstPage;
