import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const NewPaymentForm = () => {
  const { apiBaseUrl } = useAuth();
  const[allPaymentData,SetAllPaymentData]=useState([]);
  const [customerOption, setCustomerOption] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({ _id: '', name: '' });
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [mode, setmode] = useState('');
  const [remarks, setremarks] = useState('');
 
  const [submissionStatus, setSubmissionStatus] = useState(null);


    //all Customer list
    useEffect(() => {
      axios
        .get(`${apiBaseUrl}/customer/readAllCustomer`)
        .then((response) => {
          setCustomerOption(response.data);
        })
        .catch((error) => {
          console.error('Error in getting data All Customer', error);
        });
    }, [apiBaseUrl]);
  
  // Fetch Payment data on component mount
   useEffect(() => {
    axios
      .get(`${apiBaseUrl}/customer/payment/allCustomerPayments`)
      .then((response) => {
        SetAllPaymentData(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data of all Purchase', error);
      });
  }, [apiBaseUrl]);


  const submitNewPayment = async (event) => {
    event.preventDefault();
    const paymentData = {
      customerId: selectedCustomer._id,
      name: selectedCustomer.name,
      amount: amount,
      date: date,
      mode: mode,
      remarks:remarks,
     
    };


    try {
      const response = await fetch(`${apiBaseUrl}/customer/payment/createPayment`, {
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

    setSelectedCustomer({ _id: selectedValue, name: selectedName });
  };
  useEffect(() => {
    
    fetch(`${apiBaseUrl}/allCustomer`)
      .then(response => response.json())
      .then(data => setCustomerOption(data))
      .catch(error => console.error('Error fetching data: ', error));
  }, [apiBaseUrl]);


  return (
    <div className=" px-5" style={{backgroundColor:"#F1EFEF",fontFamily:"poppins",height:"150vh"}}>
    <div className="full-width-container text-dark p-3 pt-0 shadow " style={{backgroundColor:"#B9EDDD", border:"0px solid #000000",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px"  }}>
      <div className=' py-2 shadow mx-auto text-center d-flex justify-content-center bg-success text-white' style={{fontFamily:"poppins", border:"0px solid #000000",width:"30%",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px" }}>
      <h3 >New Payment</h3>
      </div>
      {submissionStatus === 'success' ? (
          <div className="alert alert-success">Return created successfully.</div>
        ) : submissionStatus === 'error' ? (
          <div className="alert alert-danger">Return Lot creation failed. Please try again.</div>
        ) : null}
      <form onSubmit={submitNewPayment} className="row p-4">
   
         <div className="mb-3 col-12 col-lg-4 ">
        <label htmlFor="customer" className="form-label">
               Select Customer
             </label>
             <select
               className="form-select shadow border-0"
               id="customer"
               value={selectedCustomer._id}
               onChange={handleSelectChange}
               required
             >
               <option value="">Select a customer</option>
              {customerOption.map((customer) => (
                 <option key={customer._id} value={customer._id} className='bg-white'>
                   {customer.name}
                 </option>
              ))}
             </select>
         </div>
        <div className="mb-3 col-12 col-lg-4">
          <label  className="form-label">
           Date
          </label>
          <input
            type="date"
            className="form-control shadow"
            placeholder='Enter Date'
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 col-12 col-lg-4">
          <label  className="form-label">
        Amount
          </label>
          <input
            type="number"
            className="form-control shadow"
            placeholder='Enter Amount'
            id="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3 col-12 col-lg-4">
          <label  className="form-label">
        Mode
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Mode of Payment'
            id="mode"
            value={mode}
            onChange={(e) => setmode(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 col-12 col-lg-4">
          <label  className="form-label">
        Remarks
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Enter Remarks'
            id="remarks"
            value={remarks}
            onChange={(e) => setremarks(e.target.value)}
            required
          />
        </div>
        
      
    
     
      
        <div className="mt-4 col-12 col-lg-4">
        <button type="submit" className=" shadow btn btn-lg btn-block btn-warning  " style={{width:"100%"}}>
          Create Payment
        </button>
        </div>
        
      </form>
    </div>

<div className="pt-5 " >
<div className=' bg-white shadow' style={{border:"1px solid rgba(0,0,0,1)",borderRadius:"15px"}}>
    <table className="table" style={{fontFamily:"poppins", }}>
        <thead >
          <tr >
            <th style={{borderRadius: "15px 0px 0px 0px" }} className=' text-white text-center bg-success' >Sr</th>
            <th className='bg-success text-white text-center '>Date</th>
            <th className='bg-success text-white text-center'> Name</th> 
             <th className='bg-success text-white text-center'>Mode</th> 
            <th  style={{borderRadius: "0px 15px 0px 0px"}} className='bg-success text-center text-white text-center'>Remarks</th>
          </tr>
        </thead>
        
        <tbody>
          {allPaymentData.slice().reverse().map((Payment,index) => (
           <>
           <tr className='shadow' key={Payment._id}>
              <td className="text-center py-3" style={{backgroundColor:""}}>{index+1}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{Payment.date}</td>
              <td className="text-center py-3" style={{backgroundColor:""}}>{Payment.name}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{Payment.mode}</td> 
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

export default NewPaymentForm;
