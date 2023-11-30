// Navbar.js
import { useState, useEffect } from "react";
import NavigationBar from './DesktopNav';
//import MobileNavbar from './MobileNavbar';
function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  // Function to update the state based on the screen size
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize(); // Set initial state based on screen size
    window.addEventListener("resize", handleResize); // Listen for window resize events

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      {isMobile ? (
        // Mobile navigation bar
        <div style={{width:"100%"}}>
         
 
         {/* <MobileNavbar/> */}
        
        </div>
      ) : (
        // Desktop navigation bar
        <>
          <NavigationBar />
        </>
      )}
    </nav>
  );
}

export default Navbar;
