import  {  useState ,useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const NewRegistrationForm = () => {
  const { apiBaseUrl } = useAuth();
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');
  const [mobile, setMobile] = useState('');
  const [customerData, setCustomerData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  

//All Registration Data
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/customer/readAllCustomer`)
      .then((response) => {
        setCustomerData(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data All Customer', error);
      });
  }, [apiBaseUrl,]);


  const submitNewPayment =  async(event)=>{
    event.preventDefault();
    const registrationData = {
        "name":name,
        "address":address,
         "mobile":mobile,
      };

    
    
      try {
        const response = await fetch(`${apiBaseUrl}/customer/createCustomer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });
    
        if (response.ok) {
          // Payment creation was successful
          setSubmissionStatus('success');
        } else {
          // Handle error scenarios
          setSubmissionStatus('error');
        }
      } catch (error) {
        console.error('Error creating payment:', error);
        setSubmissionStatus('error');
      }
  }

  return (
    <div className=" px-5" style={{backgroundColor:"#F1EFEF",height:"150vh"}}>
    <div className="full-width-container text-dark p-3 pt-0 shadow " style={{backgroundColor:"#B9EDDD",fontFamily:"poppins", border:"0px solid #000000",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px"  }}>
      <div className='shadow py-2  mx-auto text-center d-flex justify-content-center bg-success text-white' style={{fontFamily:"poppins", border:"0px solid #000000",width:"30%",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px" }}>
      <h3 >New Customer</h3>
      </div>
      {submissionStatus === 'success' ? (
          <div className="alert alert-success">Payment created successfully.</div>
        ) : submissionStatus === 'error' ? (
          <div className="alert alert-danger">Payment creation failed. Please try again.</div>
        ) : null}
      <form onSubmit={submitNewPayment} className="row p-4">
      <div className="mb-3 col-12 col-lg-3">
          <label  className="form-label">
           Name
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Enter Customer Name'
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 col-12 col-lg-3">
          <label  className="form-label">
         Address
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Enter Address'
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
     
        <div className="mb-3 col-12 col-lg-3">
          <label  className="form-label">
            Mobile
          </label>
          <input
            type="number"
            className="form-control shadow"
            placeholder='Enter Mobile Number'
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
       
        
       
        <div className="mt-4 col-12 col-lg-3">
        <button type="submit" className=" shadow btn btn-lg btn-block btn-warning  " style={{width:"100%"}}>
          Create Customer
        </button>
        </div>
        
      </form>
    </div>

<div className="pt-5 " >
  <div className=' bg-white' style={{border:"1px solid rgba(0,0,0,1)",borderRadius:"15px"}}>
    <table className="table  " style={{fontFamily:"poppins", }}>
        <thead >
          <tr >
            <th style={{borderRadius: "15px 0px 0px 0px" }} className='bg-success text-white text-bold text-center ' >Sr.</th>
            <th className='bg-success  text-white text-bold text-center '>Name</th>
            <th className='bg-success  text-white text-bold text-center '>Address</th>
            <th  style={{borderRadius: "0px 15px 0px 0px"}} className='bg-success  text-center text-white text-bold text-center'>Mobile</th>
         
          </tr>
        </thead>
        
        <tbody>
          {customerData.reverse().map((customer,index) => (
            <>
            <tr  className="shadow "  key={customer._id}>
              <td className="text-center py-3" style={{backgroundColor:""}}>{index+1}</td>
              <td className="text-center py-3" style={{backgroundColor:""}}>{customer.name}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{customer.address}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{customer.mobile}</td> 
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

export default NewRegistrationForm;
