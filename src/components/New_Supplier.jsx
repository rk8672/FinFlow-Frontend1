import  {  useState ,useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const NewSupplierForm = () => {
const   { apiBaseUrl } = useAuth();
  const [name,setName]=useState('');
  const [address,setAddress]=useState('');

  const [mobile, setMobile] = useState('');


  const [supplierData, setsupplierData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  

//All Supplier Data
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/supplier/readAllSupplier`)
      .then((response) => {
        setsupplierData(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data All supplier', error);
      });
  }, [apiBaseUrl]);


  const submitNewPayment =  async(event)=>{
    event.preventDefault();
    const SupplierData = {
        "name":name,
        "address":address,
         "mobile":mobile,
      
  
      }; 
      try {
        const response = await fetch(`${apiBaseUrl}/supplier/createSupplier`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(SupplierData),
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
      <div className='py-2 shadow  mx-auto text-center d-flex justify-content-center bg-success text-white' style={{fontFamily:"poppins", border:"0px solid #000000",width:"30%",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px" }}>
      <h3 >Create Supplier</h3>
      </div>
      {submissionStatus === 'success' ? (
          <div className="alert alert-success">New Supplier created successfully.</div>
        ) : submissionStatus === 'error' ? (
          <div className="alert alert-danger">New Supplier creation failed. Please try again.</div>
        ) : null}
      <form onSubmit={submitNewPayment} className="row p-3">
      <div className="mb-3  col-12 col-lg-3">
          <label  className="form-label">
           Name
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Enter Name '
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
            placeholder='Enter Address '
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
            placeholder='Enter Mobile '
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
     
        <div className="mt-4 col-12 col-lg-3">
        <button type="submit" className=" shadow btn btn-lg btn-block btn-warning  " style={{width:"100%"}}>
          Submit
        </button>
        </div>
        
      </form>
    </div>

<div className="pt-5 " >
<div className=' bg-white' style={{border:"1px solid rgba(0,0,0,0.1)",borderRadius:"15px"}}>
<table className="table" style={{fontFamily:"poppins", }}>
        <thead >
          <tr >
            <th style={{borderRadius: "15px 0px 0px 0px" }} className=' text-white text-center bg-success' >Sr.</th>
            <th className='bg-success text-white text-center '>Name</th>
            <th className='bg-success text-white text-center '>Address</th>
            <th  style={{borderRadius: "0px 15px 0px 0px"}} className='bg-success text-center text-white text-center'>Mobile</th>
         
          </tr>
        </thead>
        
        <tbody>
          {supplierData.reverse().map((supplier,index) => (
              <>
            <tr  className="shadow " key={supplier._id}>
                 <td className="text-center py-3" style={{backgroundColor:""}}>{index+1}</td>
              <td className="text-center py-3" style={{backgroundColor:""}}>{supplier.name}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{supplier.address}</td>
      
               <td className="text-center py-3"style={{backgroundColor:""}}>{supplier.mobile}</td> 
     
            
          
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

export default NewSupplierForm;
