import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoImage from '../images/B LOGO- 192.png';
import HomeImage from "../images/Home.png";
// import SmsImage from "../images/SMS Campaign.png";
// import BookImage from "../images/Contact Book.png";
// import ProfileImage from "../images/My Profile.png";
import LogoutImage from "../images/logout.png";

const MobileNavbar = () => {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
console.log(menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <Navbar
      className="px-4 text-white"
      style={{ top: 0, left: 0, right: 0, backgroundColor: '#E7E7E7', position: 'fixed', zIndex: 1 }}
      expand="lg"
    >
      <Navbar.Brand to="/home" className="text-white" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoImage} alt="Logo" style={{ width: '20%', height: 'auto', marginRight: '10px' }} />
      </Navbar.Brand>

      <NavLink to="/home" className="nav-link text-white" activeClassName="active" onClick={closeMenu}>
        <img src={HomeImage} alt="Logo" style={{ width: '25px', height: 'auto', marginRight: '10px' }} />
      </NavLink>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <NavDropdown title="SMS" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/NewRegistrationForm1" activeClassName="active" onClick={closeMenu}>
              Logs
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewRegistrationForm2" activeClassName="active" onClick={closeMenu}>
              Campaign Logs
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewRegistrationForm4" activeClassName="active" onClick={closeMenu}>
              Campaign Manager
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewRegistrationForm3" activeClassName="active" onClick={closeMenu}>
              DLT Template
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewRegistrationForm5" activeClassName="active" onClick={closeMenu}>
              Download Reports
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Contact Book" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/NewPurchesForm" activeClassName="active" onClick={closeMenu}>
              Blacklist
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="My Account" id="basic-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/NewPaymentForm1" activeClassName="active" onClick={closeMenu}>
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewPaymentForm" activeClassName="active" onClick={closeMenu}>
              Technical Settings
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewPaymentForm2" activeClassName="active" onClick={closeMenu}>
              User Management
            </NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/NewPaymentForm3" activeClassName="active" onClick={closeMenu}>
              Support Center
            </NavDropdown.Item>
          </NavDropdown>

          <NavLink to="/Dashboard" className="nav-link text-dark" onClick={() => { logout(); closeMenu(); }} activeClassName="active">
            <img src={LogoutImage} alt="Logo" style={{ width: '8%', height: 'auto', marginRight: '10px' }} />
            Logout
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MobileNavbar;
