import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [topSkills, setTopSkills] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [user, setUser] = useState('');
const[skillTestQuetions,setSkillTestQuetions] = useState();
  // Clear data when the user changes
  // useEffect(() => {
  //   if (user === '') {
  //     setData([]);
  //     setTopSkills(null);
  //     setSelectedSkills([]);
  //   }
  // }, [user]);

  return (
    <DataContext.Provider value={{ data, setData, topSkills, setTopSkills, selectedSkills, setSelectedSkills, user, setUser,skillTestQuetions,setSkillTestQuetions }}>
      {children}
    </DataContext.Provider>
  );
};
