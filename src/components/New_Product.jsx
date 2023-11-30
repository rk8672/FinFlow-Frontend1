import  {  useState ,useEffect} from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const NewProductForm = () => {
const   { apiBaseUrl } = useAuth();
  const [productName,setproductName]=useState('');
  const [productCode,setproductCode]=useState('');
  const [productData, setproductData] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  

//All product Data
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/product/readAllProduct`)
      .then((response) => {
        setproductData(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data All product', error);
      });
  }, [apiBaseUrl]);

//Create New Product
  const submitNewPayment =  async(event)=>{
    event.preventDefault();
    const productData = {
        "product_code":productName,
        "product_name":productCode,
    
      
  
      }; 
      try {
        const response = await fetch(`${apiBaseUrl}/product/createProduct`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
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
    <div className="full-width-container text-dark p-3 pt-0  shadow" style={{backgroundColor:"#B9EDDD",fontFamily:"poppins", border:"0px solid #000000",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px"  }}>
      <div className='  shadow py-2 mx-auto text-center d-flex justify-content-center bg-success text-white' style={{fontFamily:"poppins", border:"0px solid #000000",width:"30%",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px" }}>
      <h3 >New product Form</h3>
      </div>
      {submissionStatus === 'success' ? (
          <div className="alert alert-success">Product created successfully.</div>
        ) : submissionStatus === 'error' ? (
          <div className="alert alert-danger">Product creation failed. Please try again.</div>
        ) : null}
      <form onSubmit={submitNewPayment} className="row col-12 p-2 d-flex justify-content-center">
      <div className="mb-3 col-12 col-lg-3">
          <label  className="form-label">
           Product Code
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Enter Product Code '
            id="name"
            value={productName}
            onChange={(e) => setproductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 col-12 col-lg-3">
          <label  className="form-label">
         Product Name
          </label>
          <input
            type="text"
            className="form-control shadow"
            placeholder='Enter Product Title'
            id="address"
            value={productCode}
            onChange={(e) => setproductCode(e.target.value)}
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
<table className="table" >
        <thead >
          <tr >
            <th style={{borderRadius: "15px 0px 0px 0px" }} className=' text-white text-center bg-success' >Sr.</th>
            <th className='bg-success text-white text-center '>Product Code</th>
            <th className='bg-success text-white text-center '>Product Name</th>
            <th className='bg-success text-white text-center '>Total Purchase</th>
            <th className='bg-success text-white text-center '>Total Sales</th>
            <th  style={{borderRadius: "0px 15px 0px 0px"}} className='bg-success text-center text-white text-center'>Available Quantity</th>
         
          </tr>
        </thead>
        
        <tbody>
          {productData.reverse().map((product,index) => (
              <>
            <tr  className="shadow " key={product._id}>
            
              <td className="text-center py-3" style={{backgroundColor:""}}>{index+1}</td>
              <td className="text-center py-3" style={{backgroundColor:""}}>{product.product_code}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{product.product_name}</td>       
              <td className="text-center py-3" style={{backgroundColor:""}}>{product.total_purchase}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{product.total_sales}</td> 
              <td className="text-center py-3" style={{backgroundColor:""}}>{product.available_quantity}</td>
           
            </tr>
            <td colSpan={6} style={{height:"15px"}}></td>
            </>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default NewProductForm;
