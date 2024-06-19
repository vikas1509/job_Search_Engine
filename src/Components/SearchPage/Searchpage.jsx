// src/Components/SearchPage/SearchPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import DataContext from '../../context/DataContext';
import send from '../../assets/send.png';
import ProfileBox from '../ProfileBox/ProfileBox'; // Import the new component
import './SearchPageCss.css';
import FirstPage from '../../StudentsComponents/Test-Page/FirstPage';
const baseURL = 'http://127.0.0.1:8000';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { setData } = useContext(DataContext);
  const navigate = useNavigate();

  const fetchData = async (url) => {
    try {
      console.log('Fetching data from URL:', url); // Log the URL being fetched
      setLoading(true);
      const response = await axios.get(url);
      console.log('API Response:', response.data); // Log the response data
      const data = response.data;
      localStorage.setItem('apiResponse', JSON.stringify(data));
      setData(data.data);
      navigate('/results');
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = () => {
    if (searchTerm.trim() === '') return;
    const url = `${baseURL}/search?query=${searchTerm}`;
    fetchData(url);
  };

  const handleTakeTest = () => {
    navigate('/take-test');
  };
  return (
    <div id="full-page">
         <div className="test-button">
        <button onClick={handleTakeTest}>Take Test</button>
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
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button id="search-button" className="image-send" onClick={handleSearch}>
              <img src={send} height="20px" width="20px" className="send" alt="Send" />
            </button>
          </div>

          <div className="cart">
            <div className="cart-left">
              <ProfileBox position="Gen AI Engineer" />
              <ProfileBox position="DevOps" />
            </div>

            <div className="cart-right">
              <ProfileBox position="Python Backend Developer" />
              <ProfileBox position="Data Scientist" />
            </div>
          </div>
        </div>
      </div>
      <Loader loading={loading} />
    </div>
  );
};

export default SearchPage;
