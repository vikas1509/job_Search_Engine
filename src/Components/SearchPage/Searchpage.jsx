import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import DataContext from '../../context/DataContext';
import send from '../../assets/send-2.png';
import ProfileBox from '../ProfileBox/ProfileBox';
import './SearchPageCss.css';
import FirstPage from '../../StudentsComponents/Test-Page/FirstPage';

const baseURL = 'http://127.0.0.1:8000';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setData } = useContext(DataContext);
  const navigate = useNavigate();

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      localStorage.setItem('apiResponse', JSON.stringify(data));
      setData(data.data);
      navigate('/results');
      // hmm
    } catch (error) {
      setError('Error fetching search results. Please try again later.');
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    const searchQuery = query || searchTerm;
    if (typeof searchQuery !== 'string' || searchQuery.trim() === '') return;
    const url = `${baseURL}/search?query=${encodeURIComponent(searchQuery)}`;
    fetchData(url);
  };

  const handleTakeTest = () => {
    window.open("/take-test");
  };

  const hardcodedQuery = `About the job Company Description MeetMinutes is a company dedicated to revolutionizing the way professionals engage in meetings. Our innovative AI-powered meeting assistant is designed to make meetings more efficient, productive, and accessible. With support for multiple languages and seamless integration with popular meeting tools, MeetMinutes provides an indispensable partner for achieving meeting excellence. We are committed to helping professionals reclaim their valuable time and boost productivity, one meeting at a time. Role Description This is a full-time remote role for a Generative AI Engineer. The Generative AI Engineer will be responsible for developing and maintaining our AI-powered meeting assistant. This includes designing and implementing generative models, training and tuning the models to improve performance, and integrating the models into our existing system. The Generative AI Engineer will also collaborate with cross-functional teams to enhance the capabilities and effectiveness of the meeting assistant. They should have the ability to read and digest scientific journals and technical papers since this role requires working with the latest state of the art technologies. Qualifications Strong understanding of generative models and their applications Experience with working on projects based on open source LLM models Experience in Fine tuning open source LLMs Experience in natural language processing and understanding Familiarity with deep learning frameworks and libraries Proficiency in programming languages such as Python Knowledge of machine learning algorithms and techniques Ability to analyze and interpret data Excellent problem-solving skills Strong communication and collaboration abilities Attention to detail and ability to meet deadlines Bachelor's or Master's degree in Computer Science or related field Scalable GPU deployment experience is a plus`;

  return (
    <div>
      {loading && (
        <div className="overlay">
          <Loader />
        </div>
      )}

      <div id="full-page" className={`content ${loading ? 'blurred' : ''}`}>
        <div className="test-button">
          <button className="take-test-button" onClick={handleTakeTest}>Take Test</button>
        </div>
        <div className="right">
          <div className="box">
            <div className="Headline">Hiring Compass</div>
            <div className="search-bar">
              <input
                type="text"
                id="query-input"
                className="input-fields"
                placeholder="Search the Talent..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
               
              />
              <button id="search-button" className="image-send" onClick={() => handleSearch()}>
                <img src={send} height="20px" width="20px" className="send" alt="Send" />
              </button>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="cart">
              <div className="cart-left">
                <ProfileBox position="Gen AI Engineer" handleSearch={handleSearch} hardcodedQuery={hardcodedQuery} />
                <ProfileBox position="DevOps" handleSearch={handleSearch} hardcodedQuery={hardcodedQuery} />
              </div>
              <div className="cart-right">
                <ProfileBox position="Python Backend Developer" handleSearch={handleSearch} hardcodedQuery={hardcodedQuery} />
                <ProfileBox position="Data Scientist" handleSearch={handleSearch} hardcodedQuery={hardcodedQuery}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
