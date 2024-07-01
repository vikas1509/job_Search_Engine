import React, { useState, useEffect, useContext } from 'react';
import './SkillsTest.css'; // Separate CSS file for styling
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import FullScreenContext from '../../FullscreenContext/FullScreenContext';
import useBeforeUnload from "../useBeforeUnload/useBeforeUnload"; // Import the custom hook
import Loader from '../../Components/Loader/Loader';
import useBlocker from '../useBlocker/useBlocker';

const SkillTest = () => {
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const { enterFullScreen } = useContext(FullScreenContext);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [percentageAnswered, setPercentageAnswered] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading questions

  useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');
  const confirmationMessage = 'Are you sure you want to leave this page? You have unsaved changes.';
  useBlocker(confirmationMessage, true);
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const storedQuestions = JSON.parse(sessionStorage.getItem(`questions_${user}`));

        if (storedQuestions) {
          setQuestions(storedQuestions);
          setIsLoading(false); // Turn off loading state
        } else {
          const response = await fetch(`http://localhost:8000/flask/skill_test/${user}`);
          const data = await response.json();
          console.log(data[0], "skills questions");
          setQuestions(data[0]); // Assuming the response has a questions key with the list of questions
          sessionStorage.setItem(`questions_${user}`, JSON.stringify(data[0]));
          setIsLoading(false); // Turn off loading state
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setIsLoading(false); // Turn off loading state in case of error
      }
    };

    fetchQuestions();
  }, [user]);

  useEffect(() => {
    checkForm();
  }, [answers, questions]);

  const handleChange = (questionIndex, optionValue) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: optionValue,
    }));
  };

  const checkForm = () => {
    const answeredQuestions = Object.keys(answers).length;
    const percentage = questions.length > 0 ? (answeredQuestions / questions.length) * 100 : 0;
    setPercentageAnswered(percentage);
    setIsSubmitDisabled(answeredQuestions !== questions.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitDisabled) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', user);
    formData.append('count', questions.length);
    Object.keys(answers).forEach((key, index) => {
      formData.append(`mcq-${index + 1}`, answers[key]);
    });

    try {
      const response = await fetch('http://localhost:8000/flask/skill_submit_test', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        navigate('/ProfessionalTest');
        enterFullScreen();
        alert('Test submitted successfully.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Failed to submit test.');
      }
    } catch (error) {
      console.error('Error submitting the test:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader />; // Display loader while fetching questions
  }

  if (questions.length === 0) {
    return <p>No questions found.</p>; // Handle case where no questions are fetched
  }

  return (
    <div className="skillsTestContainer">
      <h1 className="skillsTestHeading">Skill Test</h1>
      <form id="testForm" onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <div className="skillsTestQuestion">
              <p>{question.question}</p>
            </div>
            <ul className="skillsTestOptions">
              {['A', 'B', 'C', 'D'].map((option) => (
                <li key={option}>
                  <input
                    type="radio"
                    id={`option${option}-${index}`}
                    name={`mcq-${index + 1}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleChange(index, option)}
                    required
                  />
                  <label htmlFor={`option${option}-${index}`}>{question[`option${option}`]}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <input type="hidden" name="name" value={user} />
        <input type="hidden" name="count" value={questions.length} />
        <div className="skillsTestSubmitBtnWrapper">
          <p className="skillsTestAnsweredQuestions">You Answered: {percentageAnswered}%</p>
        </div>
        <button type="submit" className="skillsTestSubmitBtn" disabled={isSubmitDisabled}>
          Submit
        </button>
      </form>
      <p id="error" className="skillsTestError" style={{ display: isSubmitDisabled ? 'block' : 'none' }}>
        Please answer all questions
      </p>
      {isSubmitting && <Loader />} {/* Display loader during form submission */}
    </div>
  );
};

export default SkillTest;
