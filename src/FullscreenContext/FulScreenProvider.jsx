import { useState } from "react";
import FullScreenContext from "./FullScreenContext";
export const FullScreenProvider = ({ children }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
  
    const enterFullScreen = () => {
        console.log("entered in full screen");
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      setIsFullScreen(true);
    };
  
    const exitFullScreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    };
  
    return (
      <FullScreenContext.Provider value={{ isFullScreen, enterFullScreen, exitFullScreen }}>
        {children}
      </FullScreenContext.Provider>
    );
  };
  