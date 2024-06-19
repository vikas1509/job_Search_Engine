
  import React, { useState } from 'react';
import DataContext from './DataContext';

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [topSkills, setTopSkills] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
const [user,setUser]= useState("");
  return (
    <DataContext.Provider value={{ data, setData, topSkills, setTopSkills,selectedSkills, setSelectedSkills,user,setUser }}>
      {children}
    </DataContext.Provider>
  );
};
