// src/Components/ProfileBox/ProfileBox.jsx
import React from 'react';
import send from '../../assets/send.png';
import './ProfileBox.css';

const ProfileBox = ({ position }) => {
  return (
    <div className="box-1">
      <div className="nested-box">
        <div className="position">{position}</div>
        <div className="more-profiles">
          <div className="more-profiles-info">Get top profiles</div>
          <button className="more-profile-button-1">
            <img src={send} height="24px" width="24px" className="send" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
