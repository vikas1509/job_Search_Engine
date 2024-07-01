import React, { useState, useEffect, useContext } from 'react';
import './Professional.css'; // Separate CSS file for styling
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import FullScreenContext from '../../FullscreenContext/FullScreenContext';
import useBeforeUnload from "../useBeforeUnload/useBeforeUnload"; // Import the custom hook
import Loader from '../../Components/Loader/Loader'; // Import Loader component
import useBlocker from '../useBlocker/useBlocker';

const ProfessionalTest = () => {
    const navigate = useNavigate();
    const { enterFullScreen } = useContext(FullScreenContext);
    const { user } = useContext(DataContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [percentageAnswered, setPercentageAnswered] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // State for loading questions

    useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');
    const confirmationMessage = 'Are you sure you want to leave this page? You have unsaved changes.';
    useBlocker(confirmationMessage, true);
    useEffect(() => {
        // Scroll to top when the component mounts jhhfufbugubuhhfbufbufbf
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/flask/profess/${user}`);
                const data = await response.json();

                console.log(data[0], "professional questions");
                setQuestions(data[0]);
                setIsLoading(false); // Turn off loading state
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

        const formData = new FormData();
        formData.append('name', user);
        formData.append('count', questions.length);
        Object.keys(answers).forEach((key, index) => {
            formData.append(`mcq-${index + 1}`, answers[key]);
        });

        try {
            const response = await fetch('http://localhost:8000/flask/profess_submit_test', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                navigate("/ReasoningTest")
                enterFullScreen();
                alert('Test submitted successfully.');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert('Failed to submit test.');
            }
        } catch (error) {
            console.error('Error submitting the test:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    if (isLoading) {
        return <Loader />; // Display loader while fetching questions
    }

    if (questions.length === 0) {
        return <p>No questions found.</p>; // Handle case where no questions are fetched
    }

    return (
        <div className="professionalContainer">
            <h1 className="professionalTitle">Professionalism Test</h1>
            <form id="testForm" onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <div className="professionalQuestion">
                            <p>{question.question}</p>
                        </div>
                        <ul className="professionalOptions">
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
                <div className="professionalSubmitBtnWrapper">
                    <p className="professionalAnsweredQuestions">You Answered: {percentageAnswered}%</p>
                </div>
                <button type="submit" className="professionalSubmitBtn" disabled={isSubmitDisabled}>
                    Submit
                </button>
            </form>
            <p className="professionalError" id="error" style={{ display: isSubmitDisabled ? 'block' : 'none' }}>
                Please answer all questions
            </p>
        </div>
    );
};

export default ProfessionalTest;
