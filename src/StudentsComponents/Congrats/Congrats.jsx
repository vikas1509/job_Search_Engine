import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import './Congrats.css'; // Import the CSS file for styling
import useBeforeUnload from "../useBeforeUnload/useBeforeUnload"; // Import the custom hook
import Loader from '../../Components/Loader/Loader';
import useBlocker from '../useBlocker/useBlocker';

const Congrats = () => {
    const { user } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true); // State for loader
    const confirmationMessage = 'Are you sure you want to leave this page? You have unsaved changes.';
    useBlocker(confirmationMessage, true);
    useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');

    useEffect(() => {
        // Simulating some asynchronous operations (e.g., fetching data)
        const simulateLoading = async () => {
            // Simulate a delay (e.g., fetching data from server)
            setTimeout(() => {
                setIsLoading(false); // Turn off loader after simulating delay
            }, 2000); // Adjust the delay as necessary
        };

        simulateLoading();
    }, []);

    if (isLoading) {
        return <Loader />; // Display loader while performing operations
    }

    return (
        <div className="congrats-body">
            <div className="confetti-wrapper" id="confetti-wrapper"></div>
            <div className="congrats-container">
                <div className="congrats-content">
                    <h1 className="congrats-title">Congratulations!</h1>
                    <p className="congrats-message">You have successfully submitted the test.</p>
                    <p className="congrats-message">
                        Please check your performance here
                        <Link to={`/Score`}>view</Link> for
                        the score and detailed analysis of your performance.
                    </p>
                </div>
            </div>
            <div className="congrats-footer">Hiring is powered by Hire-AI</div>
        </div>
    );
};

export default Congrats;
