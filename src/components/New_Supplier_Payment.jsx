import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const NewSupplierPaymentForm = () => {
  const { apiBaseUrl } = useAuth();
  const[allPaymentData,SetAllPaymentData]=useState([]);
  const [supplierOption, setsupplierOption] = useState([]);
  const [selectedsupplier, setSelectedsupplier] = useState({ _id: '', name: '' });
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  
  const [remarks, setremarks] = useState('');
 
  const [submissionStatus, setSubmissionStatus] = useState(null);


    //All Supplier list
    useEffect(() => {
      axios
        .get(`${apiBaseUrl}/supplier/readAllSupplier`)
        .then((response) => {
          setsupplierOption(response.data);
        })
        .catch((error) => {
          console.error('Error in getting data All supplier', error);
        });
    }, [apiBaseUrl]);
  
  // All Supplier Payment 
   useEffect(() => {
    axios
      .get(`${apiBaseUrl}/supplier/payment/allSupplierPayments`)
      .then((response) => {
        SetAllPaymentData(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data of all Purchase', error);
      });
  }, [apiBaseUrl]);

// Create New Supplier Payment
  const submitNewPayment = async (event) => {
    event.preventDefault();
    const paymentData = {
      "supplierId": selectedsupplier._id,
      "amount": amount,
      "date": date,
      "name": selectedsupplier.name,
      "remarks":remarks
     
    };


    try {
      const response = await fetch(`${apiBaseUrl}/supplier/payment/createPayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Error creating purchase:', error);
      setSubmissionStatus('error');
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;

    setSelectedsupplier({ _id: selectedValue, name: selectedName });
  };
 



  return (
    <div className=" px-5 pb-5" style={{backgroundColor:"#F1EFEF",fontFamily:"poppins"}}>
    <div className="full-width-container text-dark p-3 pt-0  " style={{backgroundColor:"#B9EDDD", border:"0px solid #000000",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px"  }}>
      <div className='py-3   mx-auto text-center d-flex justify-content-center bg-success text-white' style={{fontFamily:"poppins", border:"0px solid #000000",width:"30%",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px" }}>
      <h3 >New Supplier Payment</h3>
      </div>
      {submissionStatus === 'success' ? (
          <div className="alert alert-success">Supplier created successfully.</div>
        ) : submissionStatus === 'error' ? (
          <div className="alert alert-danger">Supplier Paymnet failed. Please try again.</div>
        ) : null}
      <form onSubmit={submitNewPayment} className="row p-3">
   
         <div className="mb-3 col-12 col-lg-3">
        <label htmlFor="supplier" className="form-label">
               Select supplier
             </label>
             <select
               className="form-select"
               id="supplier"
               value={selectedsupplier._id}
               onChange={handleSelectChange}
               required
             >
               <option value="">Select a supplier</option>
              {supplierOption.map((supplier) => (
                 <option key={supplier._id} value={supplier._id} className='bg-white'>
                   {supplier.name}
                 </option>
              ))}
             </select>
         </div>
        <div className="mb-3 col-12 col-lg-2">
          <label  className="form-label">
           Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 col-12 col-lg-2">
          <label  className="form-label">
        Amount
          </label>
          <input
            type="number"
            className="form-control"
            placeholder='Enter Amount'
            id="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        
     
        <div className="mb-3 col-12 col-lg-2">
          <label  className="form-label">
        Remarks
          </label>
          <input
            type="text"
            className="form-control"
            placeholder='Enter Remarks'
            id="remarks"
            value={remarks}
            onChange={(e) => setremarks(e.target.value)}
            required
          />
        </div>
        
      
    
     
      
        <div className="mt-4 col-12 col-lg-3">
        <button type="submit" className=" shadow btn btn-lg btn-block btn-warning  " style={{width:"100%"}}>
          Create Payment
        </button>
        </div>
        
      </form>
    </div>

<div className="pt-5 " >
<div className=' bg-white' style={{border:"1px solid rgba(0,0,0,0.1)",borderRadius:"15px"}}>
<table className="table" style={{fontFamily:"poppins", }}>
        <thead >
          <tr >
            <th style={{borderRadius: "15px 0px 0px 0px" }} className=' text-white text-center bg-success' >Sr</th>
            <th className='bg-success text-white text-center '>Date</th>
            <th className='bg-success text-white text-center'> Name</th> 
           
            <th  style={{borderRadius: "0px 15px 0px 0px"}} className='bg-success text-center text-white text-center'>Remarks</th>
          </tr>
        </thead>
        
        <tbody>
          {allPaymentData.slice().reverse().map((Payment,index) => (
            <>
             <tr  className="shadow " key={Payment._id}>
              <td className="text-center py-3" style={{backgroundColor:""}}>{index+1}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{Payment.date}</td>
              <td className="text-center py-3" style={{backgroundColor:""}}>{Payment.name}</td>
             
               <td className="text-center py-3"style={{backgroundColor:""}}>{Payment.remarks}</td> 
    
           
            
          
            </tr>
            <td colSpan="6" style={{ height: '15px' }}></td>
            </>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>

  );
};

export default NewSupplierPaymentForm;
