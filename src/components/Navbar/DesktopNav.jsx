import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
//import HomeImage from "../../images/Home.png";
//import SmsImage from "../../images/SMS Campaign.png";
//import BookImage from "../../images/Contact Book.png";
//import ProfileImage from "../../images/My Profile.png";
//import LogoutImage from "../../images/logout.png";
//import DocImage from "../../images/Document.png";
//import VolImage from "../../images/Volume.png";
//import VolSetImage from "../../images/Volume Setting.png";
//import DLTImage from "../../images/Dlt Template.png";
//import BlockImage from "../../images/Ban.png";
import BrandImage from "../../images/rupee.png";
import Sales from "../../images/bag (1).png";
import Home from "../../images/home (2).png"
import Purchase from "../../images/express-delivery.png"
import Product from "../../images/Purchase.png"
import Logout from "../../images/power-off.png"
//import Dashboard from "../../images/Dashboard.png"
//Sales Customer Icon
import NewCustomer from"../../images/new customer.png"
import AllCustomer from "../../images/people.png"
import NewSalesCustomer from "../../images/sales (1).png"
import NewPaymentCustomer from "../../images/money.png"
// Purchase Supplier Icon
import NewSupplier from "../../images/supplier.png"
import NewPurchaseSupplier from "../../images/buy.png"
import NewPaymentSupplier from "../../images/credit-card.png"
import AllSupplier from "../../images/group (1).png"

//All Products
import AllProducts from "../../images/inventory.png"




import './DesktopNav.css';





const InternalNavBarSMS = ({ commonMinimized, toggleCommonMinimized, internalNavMinimized, toggleMinimizeMaximize }) => {
  const toggleInternalNavMinimized = () => {
    toggleCommonMinimized(!commonMinimized);
    toggleMinimizeMaximize(!internalNavMinimized);
  };

  return (
    <div className={`internal-nav shadow ${commonMinimized ? 'minimized' : ''} `}>
      <div className='m-0 mt-4  d-flex justify-content-end pb-4' style={{ borderBottom: "1px solid #E8E2E2" }}>
      <div className=" nav-links2 internal-link" style={{fontSize:"22px",fontWeight:"bold"}}>{!commonMinimized && 'Customer'}</div>
        <button className=" px-3 py-2" style={{ fontFamily: "Nunito,sans-serif", border: "0px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#E7E7E7" }} onClick={toggleInternalNavMinimized}>
          {commonMinimized ? '>' : '<'}
        </button>
      </div>
      <div className="nav-links2 mt-4 ">
        <NavLink   to="/sales/NewRegistrationForm" className="internal-link ">
          <img src={NewCustomer} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'New Customer'}
        </NavLink>
        <NavLink to="/sales/NewPurchesForm" className="internal-link">
          <img src={NewSalesCustomer} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'New Sale'}
        </NavLink>
        <NavLink to="/sales/NewPaymentForm" className="internal-link">
          <img src={NewPaymentCustomer} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'New Payments'}
        </NavLink>
        <NavLink to="/sales/AllCustomer" className="internal-link d-flex justify-content-start">
          <img src={AllCustomer} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'All Customers'}
        </NavLink>
      
      </div>
    </div>
  );
};

InternalNavBarSMS.propTypes = {
  commonMinimized: PropTypes.bool.isRequired,
  toggleCommonMinimized: PropTypes.func.isRequired,
  internalNavMinimized: PropTypes.bool.isRequired,
  toggleMinimizeMaximize: PropTypes.func.isRequired,
};

const InternalNavBarBook = ({ commonMinimized, toggleCommonMinimized, internalNavMinimized, toggleMinimizeMaximize }) => {
  const { setIdValue, } = useAuth();
  //const [drop1,setDrop1]=useState(" ");
  
  const toggleInternalNavMinimized = ( ) => {
    toggleCommonMinimized(!commonMinimized);
    toggleMinimizeMaximize(!internalNavMinimized);
  };

  return (
    <div className={`internal-nav shadow ${commonMinimized ? 'minimized' : ''} `}>
      <div className='m-0 mt-4  d-flex justify-content-end pb-4' style={{ borderBottom: "1px solid #E8E2E2" }}>
      <div className=" nav-links2 internal-link" style={{fontSize:"22px",fontWeight:"bold"}}>{!commonMinimized && 'Supplier'}</div>
        <button className=" px-3 py-2" style={{ fontFamily: "Nunito,sans-serif", border: "0px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#E7E7E7" }} onClick={toggleInternalNavMinimized}>
          {commonMinimized ? '>' : '<'}
        </button>
      </div>
      <div className="nav-links2">
        <NavLink  as={NavLink}
              to="/purchase/newSupplier"
              onClick={() => {setIdValue("654a1b6dc8c0c4e4e96fe8e7","Kailawar")}}
              className="internal-link">
          <img src={NewSupplier} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'Create Supplier'}
        </NavLink>
        <NavLink to="/purchase/newSupplierPurchase" className="internal-link">
          <img src={NewPurchaseSupplier} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'New Purchase'}
        </NavLink>
        <NavLink to="/purchase/newSupplierPayment" className="internal-link">
          <img src={NewPaymentSupplier} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'New Payment'}
        </NavLink>
        <NavLink to="/purchase/Allsupplier" className="internal-link">
          <img src={AllSupplier} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'All Suppliers'}
        </NavLink>
      </div>
    </div>
  );
};

InternalNavBarBook.propTypes = {
  commonMinimized: PropTypes.bool.isRequired,
  toggleCommonMinimized: PropTypes.func.isRequired,
  internalNavMinimized: PropTypes.bool.isRequired,
  toggleMinimizeMaximize: PropTypes.func.isRequired,
};

const InternalNavBarProfile = ({ commonMinimized, toggleCommonMinimized, internalNavMinimized, toggleMinimizeMaximize }) => {
  const toggleInternalNavMinimized = () => {
    toggleCommonMinimized(!commonMinimized);
    toggleMinimizeMaximize(!internalNavMinimized);
  };

  return (
    <div className={`internal-nav shadow ${commonMinimized ? 'minimized' : ''} `}>
      <div className='m-0 mt-4  d-flex justify-content-end pb-4' style={{ borderBottom: "1px solid #E8E2E2" }}>
      <div className=" nav-links2 internal-link" style={{fontSize:"22px",fontWeight:"bold"}}>{!commonMinimized && 'Products'}</div>
        <button className=" px-3 py-2" style={{ fontFamily: "Nunito,sans-serif", border: "0px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#E7E7E7" }} onClick={toggleInternalNavMinimized}>
          {commonMinimized ? '>' : '<'}
        </button>
      </div>
      <div className="nav-links2 mt-4 ">
        <NavLink to="/product/newProductForm" className="internal-link">
          <img src={AllProducts} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'Products'}
        </NavLink>
      
      </div>
    </div>
  );
};

InternalNavBarProfile.propTypes = {
  commonMinimized: PropTypes.bool.isRequired,
  toggleCommonMinimized: PropTypes.func.isRequired,
  internalNavMinimized: PropTypes.bool.isRequired,
  toggleMinimizeMaximize: PropTypes.func.isRequired,
};

const InternalNavBarHome = ({ commonMinimized, toggleCommonMinimized, internalNavMinimized, toggleMinimizeMaximize }) => {
  const toggleInternalNavMinimized = () => {
    toggleCommonMinimized(!commonMinimized);
    toggleMinimizeMaximize(!internalNavMinimized);
  };

  return (
    <div className={`internal-nav shadow ${commonMinimized ? 'minimized' : ''} `}>
      <div className='m-0 mt-4  d-flex justify-content-end pb-4' style={{ borderBottom: "1px solid #E8E2E2" }}>
      <div className=" nav-links2 internal-link" style={{fontSize:"22px",fontWeight:"bold"}}>{!commonMinimized && 'Home'}</div>
        <button className=" px-3 py-2" style={{ fontFamily: "Nunito,sans-serif", border: "0px", borderRadius: "10px 0px 0px 10px", backgroundColor: "#E7E7E7" }} onClick={toggleInternalNavMinimized}>
          {commonMinimized ? '>' : '<'}
        </button>
      </div>
      <div className="nav-links2 mt-4  ">
        <NavLink to="/home" className="internal-link shadow">
          <img src={AllProducts} alt="Home" style={{ width: '20px', height: 'auto' }} className='m-3' />
          {!commonMinimized && 'Dashboard'}
        </NavLink>
       
      </div>
    </div>
  );
};

InternalNavBarHome.propTypes = {
  commonMinimized: PropTypes.bool.isRequired,
  toggleCommonMinimized: PropTypes.func.isRequired,
  internalNavMinimized: PropTypes.bool.isRequired,
  toggleMinimizeMaximize: PropTypes.func.isRequired,
};


const NavigationBar = () => {
  const { logout } = useAuth();
  const [showInternalNav, setShowInternalNav] = useState("home");
  const [internalNavMinimized, setInternalNavMinimized] = useState(false);
  const [commonMinimized, setCommonMinimized] = useState(false);
  const location = useLocation();
  useEffect(() => {
    // Extract the part of the path after the first slash as the internal nav type
    const pathParts = location.pathname.split('/');
    const navType = pathParts[1];
    setShowInternalNav(navType);
  }, [location.pathname]);
  const toggleInternalNav = (type) => {
    if (showInternalNav === type) {
      //setShowInternalNav(null);
      // setInternalNavMinimized(!internalNavMinimized);
    } else {
      setShowInternalNav(type);
    }
  };

  const toggleMinimizeMaximize = () => {
    setInternalNavMinimized(!internalNavMinimized);
  };

  const toggleCommonMinimized = () => {
    setCommonMinimized(!commonMinimized);
  };

  return (
    <>
      <div className={`sidebar py-5 h-100 shadow ${showInternalNav ? 'internal-nav-open' : ''}`}>
        <div className="logo d-flex justify-content-center">
          <img src={BrandImage} alt="Logo" style={{ width: '60%', height: 'auto' }} />
        </div>
        <div className="nav-links d-flex mt-5 ">
          <div className="nav-link-container">
            <NavLink to="/home" className="link" onClick={() => { toggleInternalNav("home") }}>
              <img src={Home} alt="Home" style={{ width: '20px', height: 'auto' }} />
            </NavLink>
            {showInternalNav === "home" && (
            <InternalNavBarHome toggleCommonMinimized={toggleCommonMinimized} commonMinimized={commonMinimized} internalNavMinimized={internalNavMinimized} toggleMinimizeMaximize={toggleMinimizeMaximize} />
          )}
          </div>
          <div className="nav-link-container">
            <NavLink to="/sales/NewRegistrationForm" className="link" onClick={() => toggleInternalNav("sms")}>
              <img src={Sales} alt="SMS" style={{ width: '20px', height: 'auto' }} />
            </NavLink>
            {showInternalNav === "sales" && (
              <InternalNavBarSMS toggleCommonMinimized={toggleCommonMinimized} commonMinimized={commonMinimized} internalNavMinimized={internalNavMinimized} toggleMinimizeMaximize={toggleMinimizeMaximize} />
            )}
          </div>
          <div className="nav-link-container">
            <NavLink to="/purchase/newSupplierPurchase" className="link" onClick={() => toggleInternalNav("book")}>
              <img src={Purchase} alt="Book" style={{ width: '20px', height: 'auto' }} />
            </NavLink>
            {showInternalNav === "purchase" && (
              <InternalNavBarBook toggleCommonMinimized={toggleCommonMinimized} commonMinimized={commonMinimized} internalNavMinimized={internalNavMinimized} toggleMinimizeMaximize={toggleMinimizeMaximize} />
            )}
          </div>
        </div>
        <div className=" ">
          <NavLink to="/product/newProductForm" className="link" onClick={() => toggleInternalNav("profile")}>
            <img src={Product} alt="Profile" style={{ width: '20px', height: 'auto' }} />
          </NavLink>
          {showInternalNav === "product" && (
            <InternalNavBarProfile toggleCommonMinimized={toggleCommonMinimized} commonMinimized={commonMinimized} internalNavMinimized={internalNavMinimized} toggleMinimizeMaximize={toggleMinimizeMaximize} />
          )}
          <NavLink to="/" className="link" onClick={() => { logout() }}>
            <img src={Logout} alt="Logout" style={{ width: '20px', height: 'auto' }} />
          </NavLink>
        </div>
      </div>

      <div className={`content ${showInternalNav ? 'content-internal-nav-open' : ''} ${internalNavMinimized ? 'content-internal-nav-open-minimized' : ''}`}>
        {/* Content components go here */}
      </div>
    </>
  );
};

export default NavigationBar;
