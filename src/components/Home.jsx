import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
//import { Card } from 'react-bootstrap';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
//import { Chart } from "react-google-charts";
import {
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Decimation,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Decimation);
ChartJS.register(ChartDataLabels);
import {
   PointElement,
  LineElement,
 Filler,
  
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const Home = () => {
  const { apiBaseUrl} = useAuth();
  const [tableData, setTableData] = useState([]);

  const [grandTotal, setgrandTotal] = useState([]);
console.log(tableData);
  const ApicallingFunc = async () => {
    try {
      const apiUrl = `${apiBaseUrl}/product/readAllProduct`;

      const response = await axios.get(apiUrl);
      setTableData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  //Grand Total of sales and purchase
  const GrandTotal = async () => {
    try {
      const apiUrl = `${apiBaseUrl}/product/calculateGrandTotals`;

      const response = await axios.get(apiUrl);
      setgrandTotal(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    ApicallingFunc();

    GrandTotal();
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, color:"#fff",text: "Advanced Custom Bar Chart" ,},
      datalabels: {
        anchor: 'end',
        align: 'top',
        font: { size: 12, weight: 'bold' },
        color: 'black',
      },
    },
    scales: {
      // x: {
      //   title: { display: true, text: "Months", color: 'blue' },
      //   ticks: { font: { size: 12 }, color: 'darkblue' },
      // },
      // y: {
      //   title: { display: true, text: "Quantity", color: 'black' },
      //   ticks: { font: { size: 12 }, color: 'darkred' },
      // },
    },
  };
  const data = {
    labels:  tableData.map((product) => product.product_name),
    datasets: [
      {
        label: "Purchase",
        data: tableData.map((product) => product.total_purchase),
        backgroundColor: "#36A2EB",
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 99, 132, 1)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "Sales",
        data: tableData.map((product) => product.total_sales),
        backgroundColor: "#FF6384",
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(255, 99, 132, 1)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  //Donut For Sales
  const dataDonutSales = {
    labels:   tableData.map((product) => product.product_name),
    datasets: [
      {
        data: tableData.map((product) => product.total_sales),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56',"rgba(75,192,192,1)"],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56',"rgba(75,192,192,1)"],
      },
    ],
  };
  const optionsDonutSales = {
    maintainAspectRatio: false,
    cutoutPercentage: 30,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Sales',
        color: '#000000',
        fontStyle: 'bold',
        position: 'top', // You can change the position as needed
        font: {
          size: 18,
        },
      },
    },

  };

// Donut for Purchase
const dataDonutPurchase = {
  labels:   tableData.map((product) => product.product_name),
  datasets: [
    {
      data: tableData.map((product) => product.total_purchase),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56',"rgba(75,192,192,1)"],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56',"rgba(75,192,192,1)"],
    },
  ],
};
// Options for the chart
const optionsDonutPurchase = {
  maintainAspectRatio: false,
    cutoutPercentage: 30,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        color: '#000000',
        fontStyle: 'bold',
        display: true,
        text: 'Purchase',
        position: 'top', // You can change the position as needed
        font: {
          size: 18,
        },
      },
    },
};




  //area Chart
   const optionsArea = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  
  
   const dataArea = {
    labels:  tableData.map((product) => product.product_name),
    datasets: [
      {
        label: 'Sales',
        data: tableData.map((product) => product.total_sales),
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        tension: 0.4, // Adjust the tension to control the curve of the area
      },
      {
        label: 'Purchase',
        data: tableData.map((product) => product.total_purchase),
        fill: true,
        backgroundColor: '#FFB1C1',
        borderColor: '#ff6584',
        borderWidth: 2,
        tension: 0.4, // Adjust the tension to control the curve of the area
      },
    ],
  };
  
  return (
    <div className="text-black text-center p-3 " style={{ backgroundColor: "#F1EFEF", height:"100vh"}} >
 
   
  
     
      <div className="full-width-container">
      <div className="row m-3 d-flex justify-content-between" >
         <div className="col-3">
        
             <div className="bg-white shadow p-3" style={{borderRadius:"10px"}}>

              <span style={{fontSize:"20px",fontWeight:"bold"}}> Sales  </span>
              <span style={{fontSize:"20px",color:"green",fontWeight:"bold"}}>{grandTotal.grand_total_sales} </span>
              </div>
           
           
          </div>
          <div className="col-6">
       
          <div className="bg-white shadow p-2 " style={{borderRadius:"10px"}}>
              <span style={{fontSize:"32px",fontWeight:"bold"}}> Smart </span>
              <span style={{fontSize:"32px",fontWeight:"bold"}}> Dashboard </span>
             
              </div>

          </div>
          <div className="col-3">
     
          <div className="bg-white shadow p-3" style={{borderRadius:"10px"}}>
              <span style={{fontSize:"20px",fontWeight:"bold"}}> Purchase  </span>
              <span style={{fontSize:"20px",color:"red",fontWeight:"bold"}}>{grandTotal.grand_total_purchase}</span>
             
              
              </div>
         
          </div>
     
    
      </div>
      </div>
   
  
      <div className="full-width-container py-1">
     <div className="row m-3 d-flex justify-content-between" >
  
     <div className="col-3 ">

      <div className="p-3 bg-white shadow" style={{ fontFamily: "poppins",borderRadius:"20px" ,height:"100%"}}>
      
    <Doughnut className="shadow p-2 " style={{borderRadius:"20px"}} data={dataDonutSales} options={optionsDonutSales} />
   
    </div>
    </div>
    <div className= " col-6" >
    <div className="p-3  bg-white text-center shadow" style={{ fontFamily: "poppins", backgroundColor: "#E0FFFF",borderRadius:"20px",height:"100%" }}>
    <Bar  className="shadow p-2" style={{height:"250px",borderRadius:"20px"}} options={options} data={data} />
    </div>
    </div>
    <div className="col-3 ">
      <div className="p-3 bg-white shadow" style={{ fontFamily: "poppins",borderRadius:"20px" ,height:"100%"}}>
    <Doughnut className="shadow p-2 " style={{borderRadius:"20px"}} data={dataDonutPurchase} options={optionsDonutPurchase} />
    </div>
    </div>
    
    </div>
    </div>
   
    <div className="full-width-container">
    <div className="row m-3">
    <div className="col-12">
     <div className="bg-white  shadow p-3 " style={{height:"40vh",borderRadius:"20px" ,}}>

    <Line  options={optionsArea} data={dataArea} />
    </div>
    </div>
    </div>
    </div>
    
 
    </div>
  );
};

export default Home;
