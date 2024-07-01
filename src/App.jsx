import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Searchpage from "./Components/SearchPage/Searchpage";
import ResultsPage from './Components/ResultPage/ResultPage';
import FirstPage from './StudentsComponents/Test-Page/FirstPage';
import TopSkills from './StudentsComponents/Top-skills/TopSkills';
import Proficiency from './StudentsComponents/Proficiency/Proficiency';
import SuccessEmail from './StudentsComponents/SuccessEmail/SuccessEmail';
import SkillTest from './StudentsComponents/SkillTest/SkillsTest';
import ProfessionalTest from './StudentsComponents/ProfessionalTest/Professional';
import ReasoningTest from './StudentsComponents/Reasoning/Reasoning';
import Verbal from './StudentsComponents/VerbalTest/Verbal';
import SituationTest from './StudentsComponents/SituationTest.jsx/Situation';
import Congrats from './StudentsComponents/Congrats/Congrats';
import Score from './StudentsComponents/Score/Score';
import useBeforeUnload from "../src/StudentsComponents/useBeforeUnload/useBeforeUnload"; // Import the custom hook
// import FullScreenComponent from './StudentsComponents/fullscreen/FullScreenComponent';


const App = () => {
  useBeforeUnload('Are you sure you want to leave? Changes you made may not be saved.');
  return (
    <Routes>
      <Route path="/" element={<Searchpage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/take-test" element={<FirstPage />} /> 
      <Route path="/top-skills" element={<TopSkills />} />
      <Route path="/proficiency" element={<Proficiency />} /> 
      <Route path="/SuccesEmail" element={<SuccessEmail/>}/>
      <Route path="/SkillTest" element={<SkillTest/>}/>
      <Route path='ProfessionalTest' element={<ProfessionalTest/>}/>
      <Route path='/ReasoningTest' element={<ReasoningTest/>}/>
      <Route path='/Verbal' element={<Verbal/>}/>
      <Route path='/Situation' element={<SituationTest/>}/>
      <Route path='/Congratulations' element={<Congrats/>}/>
      <Route path='/Score' element={<Score/>}/>
      {/* <Route path="/start-test" element={<FullScreenComponent/>}/> */}
    </Routes>
  );
};

export default App;
