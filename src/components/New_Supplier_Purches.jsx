import{ useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const NewSupplierPurchaseForm = () => {
  const { apiBaseUrl } = useAuth();
  const[allPurchaseData,SetAllPurchaseData]=useState([]);
  const [customerOption, setCustomerOption] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({ _id: '', name: '' });
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const [productOption, setproductOption] = useState([]);
  const [selectedproduct, setSelectedproduct] = useState({ _id: '', name: '' });
  const [submissionStatus, setSubmissionStatus] = useState(null);


  //all product list
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/product/readAllProduct`)
      .then((response) => {
        setproductOption(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data of all Purchase', error);
      });
  }, [apiBaseUrl]);
 

    //all Supplier list
    useEffect(() => {
      axios
        .get(`${apiBaseUrl}/supplier/readAllSupplier`)
        .then((response) => {
          setCustomerOption(response.data);
        })
        .catch((error) => {
          console.error('Error in getting data All Customer', error);
        });
    }, [apiBaseUrl]);
  
  //All Purchase Table 
   useEffect(() => {
    axios
      .get(`${apiBaseUrl}/supplier/purchase/getAllPurchase`)
      .then((response) => {
        SetAllPurchaseData(response.data);
      })
      .catch((error) => {
        console.error('Error in getting data of all Purchase', error);
      });
  }, [apiBaseUrl,]);

  //Create New Purchase
  const submitNewPurchase = async (event) => {
    event.preventDefault();
    const purchaseData = {
      supplier: selectedCustomer._id,
      supp_name: selectedCustomer.name,
      productName:selectedproduct.name,
      amount: amount,
      purchaseDate: date,
      quantity: quantity,
      product:selectedproduct._id,
    };


    try {
      const response = await fetch(`${apiBaseUrl}/supplier/purchase/createPurchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
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


  const handleSelectChangeproduct = (e) => {
    const selectedValue = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;

    setSelectedproduct({ _id: selectedValue, name: selectedName });
  };



  return (
    <div className=" px-5 pb-5" style={{backgroundColor:"#F1EFEF",fontFamily:"poppins"}}>
    <div className="full-width-container text-dark p-3 pt-0 shadow " style={{backgroundColor:"#B9EDDD", border:"0px solid #000000",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px"  }}>
      <div className='shadow py-3  mx-auto text-center d-flex justify-content-center bg-success text-white' style={{fontFamily:"poppins", border:"0px solid #000000",width:"30%",borderTop: "0px solid #000000", borderRadius: "0px 0px 15px 15px" }}>
      <h3 >New Purchase</h3>
      </div>
      {submissionStatus === 'success' ? (
          <div className="alert alert-success">Purchase successfully.</div>
        ) : submissionStatus === 'error' ? (
          <div className="alert alert-danger">Purchase  failed. Please try again.</div>
        ) : null}
      <form onSubmit={submitNewPurchase} className="row p-3">
      <div className="mb-3 col-12 col-lg-4">
         <label htmlFor="customer" className="form-label">
                Product
              </label>
              <select
                className="form-select shadow"
                id="product"
                value={selectedproduct._id}
               onChange={handleSelectChangeproduct}
               required
            >
                <option value="">Select a product</option>
               {productOption.map((product) => (
                  <option key={product._id} value={product._id} className='bg-white'>
                    {product.product_name}
                </option>
                ))}
             </select>
         </div>
       
         <div className="mb-3 col-12 col-lg-4">
        <label htmlFor="customer" className="form-label">
               Select Supplier
             </label>
             <select
               className="form-select shadow"
               id="customer"
               value={selectedCustomer._id}
               onChange={handleSelectChange}
               required
             >
               <option value="">Select a Supplier</option>
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
            placeholder='Enter Amount '
            id="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-3 col-12 col-lg-4">
          <label  className="form-label">
          Quantity
          </label>
          <input
            type="number"
            className="form-control shadow"
            placeholder='Enter Quantity'
            id="mobile"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        
      
    
     
      
        <div className="mt-4 col-12 col-lg-4">
        <button type="submit" className=" shadow btn btn-lg btn-block btn-warning  " style={{width:"100%"}}>
          New Purchase
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
            <th className='bg-success text-white text-center '>Purchase Date</th>
            <th className='bg-success text-white text-center'>Product Name</th> 
             <th className='bg-success text-white text-center'>Supplier Name</th> 
             <th className='bg-success text-white text-center'>Amount</th>
            <th  style={{borderRadius: "0px 15px 0px 0px"}} className='bg-success text-center text-white text-center'>Quantity</th>
          </tr>
        </thead>
        
        <tbody>
          {allPurchaseData.slice().reverse().map((purchase,index) => (
            <>
            <tr   className="shadow " key={purchase._id}>
              <td className="text-center py-3" style={{backgroundColor:""}}>{index+1}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{purchase.purchaseDate}</td>
              <td className="text-center py-3" style={{backgroundColor:""}}>{purchase.productName}</td>
         
              <td className="text-center py-3" style={{backgroundColor:""}}>{purchase.supp_name}</td>
              <td className="text-center py-3"style={{backgroundColor:""}}>{purchase.amount}</td> 
               <td className="text-center py-3"style={{backgroundColor:""}}>{purchase.quantity}</td> 
          
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

export default NewSupplierPurchaseForm;
