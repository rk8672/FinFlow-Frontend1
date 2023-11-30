// src/App.js

import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
//import NavigationBar from './components/Navbar'; // Import the Navbar component
import NewPaymentForm from './components/NewPayment'; // Make sure to correct the import paths
import NewPurchesForm from './components/NewPurches'; // Correct import paths
import NewRegistrationForm from './components/NewRegistration'; // Correct import paths
import AllCustomer from './components/AllCustomer'; 
import NewSupplierForm from './components/New_Supplier';
import NewSupplierPaymentForm from './components/New_Supplier_Payment';
import NewSupplierPurchaseForm from './components/New_Supplier_Purches';
import Allsupplier from './components/All_Supplier';
import NewProductForm from './components/New_Product';
import Navbar from './components/Navbar/Navbar'
//import Navbar from "./components/Navbar/Navbar"

const App = () => {
  const { user, login,  } = useAuth();

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {user ? (
          <>
            {/* <NavigationBar />  */}
              <Navbar/>
              <div style={{ flex: 1, paddingLeft: '10px',}}>
            <Routes>
              <Route path="/home" element={<Home />} />
             
              <Route path="/sales/NewPaymentForm" element={<NewPaymentForm />} />
              <Route path="/sales/NewPurchesForm" element={<NewPurchesForm />} />
              <Route path="/sales/NewRegistrationForm" element={<NewRegistrationForm />} />
              <Route path="/sales/AllCustomer" element={<AllCustomer />} />
           
              <Route path="/purchase/newSupplier" element={<NewSupplierForm />} />
              <Route path="/purchase/newSupplierPayment" element={<NewSupplierPaymentForm />} />
              <Route path="/purchase/newSupplierPurchase" element={<NewSupplierPurchaseForm />} />
              <Route path="/purchase/Allsupplier" element={<Allsupplier />} />
              <Route path="/product/newProductForm" element={<NewProductForm />} />
             
            </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login login={login}  />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;