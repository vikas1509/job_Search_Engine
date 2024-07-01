// import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './FullScreen.css';

// const FullScreenComponent = ({where}) => {
//   const fullScreenRef = useRef(null);
//   const navigate = useNavigate();

//   const enterFullScreen = () => {
//     if (fullScreenRef.current.requestFullscreen) {
//       fullScreenRef.current.requestFullscreen();
//     } else if (fullScreenRef.current.mozRequestFullScreen) { /* Firefox */
//       fullScreenRef.current.mozRequestFullScreen();
//     } else if (fullScreenRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
//       fullScreenRef.current.webkitRequestFullscreen();
//     } else if (fullScreenRef.current.msRequestFullscreen) { /* IE/Edge */
//       fullScreenRef.current.msRequestFullscreen();
//     }
//     navigate('/skilltest'); // Navigate to TopSkills after entering full screen
//   };

//   const exitFullScreen = () => {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.mozCancelFullScreen) { /* Firefox */
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) { /* IE/Edge */
//       document.msExitFullscreen();
//     }
//   };

//   return (
//     <div ref={fullScreenRef} style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
//       <h1>This is a full-screen component</h1>
//       <button onClick={enterFullScreen}>Start the test</button>
//       <button onClick={exitFullScreen}>Exit Full Screen</button>
//     </div>
//   );
// };

// export default FullScreenComponent;
