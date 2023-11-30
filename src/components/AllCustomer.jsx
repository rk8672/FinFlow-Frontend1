import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Modal } from "react-bootstrap";

function AllCustomer() {
  const [customerData, setCustomerData] = useState([]);
  const { apiBaseUrl } = useAuth();
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [mdShow, setMdShow] = useState(false);

  const handleDetailsClick = (index) => {
    setSelectedRowIndex(index);
    setMdShow(true);
  };

  const handleCloseModal = () => {
    setMdShow(false);
    setSelectedRowIndex(null);
  };

  useEffect(() => {
    fetch(`${apiBaseUrl}/customer/readAllCustomer`)
      .then((response) => response.json())
      .then((data) => setCustomerData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [apiBaseUrl]);

  return (
    <div
      className="p-5"
      style={{
        height: "150vh",
        backgroundColor: "#F1EFEF",
        fontFamily: "poppins",
      }}
    >
      <div
        className="row d-flex justify-content-center p-4 mb-4 bg-white shadow"
        style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "15px" }}
      >
        <div style={{ fontSize: "32px" }} className="text-center">
          All Customer Ledger
        </div>
      </div>
      <div
        className="bg-white shadow"
        style={{ border: "1px solid rgba(0,0,0,1)", borderRadius: "15px" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th
                style={{ borderRadius: "15px 0px 0px 0px" }}
                className="bg-success text-white text-center"
              >
                Sr.
              </th>
              <th className="bg-success text-white text-center">Name</th>
              <th className="bg-success text-white text-center">Address</th>
              <th className="bg-success text-white text-center">Quantity</th>
              <th className="bg-success text-white text-center">Amount</th>
              <th className="bg-success text-white text-center">Payment</th>
              <th className="bg-success text-white text-center">Balance</th>
              <th
                style={{ borderRadius: "0px 15px 0px 0px" }}
                className="bg-success text-white text-center"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((item, index) => (
              <React.Fragment key={item._id}>
                <tr
                  onClick={() => handleDetailsClick(index)}
                  className="shadow"
                  key={item._id}
                >
                  <td className="text-center align-middle">{index + 1}</td>
                  <td className="text-center align-middle">{item.name}</td>
                  <td className="text-center align-middle">{item.address}</td>
                  <td className="text-center align-middle">
                    {item.totalPurchaseQuantity}
                  </td>
                  <td className="text-center align-middle">
                    ₹{item.totalPurchaseAmount}
                  </td>
                  <td className="text-center align-middle">
                    ₹{item.totalPaymentAmount}
                  </td>
                  <td className="text-center align-middle">
                    ₹{item.difference}
                  </td>
                  <td className="text-center align-middle">
                    <Button
                      onClick={() => handleDetailsClick(index)}
                      className="btn-sm float-right m-3 p-2 btn-success text-white"
                    >
                      Invoice
                    </Button>
                  </td>
                </tr>
                <td colSpan="6" style={{ height: "15px" }}></td>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <Modal
          show={mdShow}
          onHide={handleCloseModal}
          aria-labelledby="example-modal-sizes-title-sm"
          size="lg"
        >
          {selectedRowIndex !== null && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{customerData[selectedRowIndex].name}</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  display: "block",
                  overflowY: "auto",
                }}
                className="account"
              >
                <div
                  id="print-section"
                  className="p-4 text-center"
                  style={{ border: "0px solid #000000", borderRadius: "5px" }}
                >
                   <div className="text-end  p-2">
    <Button
  onClick={() => {
    const printWindow = window.open("", "_blank");

    printWindow.document.write(
      `<html><head><title>Print</title><style>body { font-family: 'Arial', sans-serif; }</style></head><body>`
    );

    // Display Customer's Name
    printWindow.document.write(
      `<h2>Invoice for ${customerData[selectedRowIndex].name}</h2>`
    );

    // Display Payments Table
    printWindow.document.write("<h3>Payments</h3>");
    printWindow.document.write(
      "<table border='1' style='border-collapse: collapse; width: 100%;'>"
    );
    printWindow.document.write(
      "<tr><th>Sr.</th><th>Date</th><th>Amount</th></tr>"
    );

    customerData[selectedRowIndex].payments
      .slice()
      .reverse()
      .forEach((payment, paymentIndex) => {
        printWindow.document.write(
          `<tr><td>${paymentIndex + 1}</td><td>${payment.date}</td><td>₹${payment.amount}</td></tr>`
        );
      });

    printWindow.document.write("</table>");

    // Display Products Table
    printWindow.document.write("<h3>Products</h3>");
    printWindow.document.write(
      "<table border='1' style='border-collapse: collapse; width: 100%;'>"
    );
    printWindow.document.write(
      "<tr><th>Sr.</th><th>Date</th><th>Quantity</th><th>Product Name</th><th>Purchase Amount</th></tr>"
    );

    customerData[selectedRowIndex].sales
      .slice()
      .reverse()
      .forEach((product, productIndex) => {
        printWindow.document.write(
          `<tr><td>${productIndex + 1}</td><td>${product.salesDate}</td><td>${product.quantity} QTL.</td><td>${product.productName}</td><td>₹${product.amount}</td></tr>`
        );
      });

    printWindow.document.write("</table></body></html>");
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  }}
  className="btn btn-success"
>
  Print Invoice
</Button>

                </div>
                  <div  className="p-3" style={{ border: "2px solid #000000" }}>
                    <div className="row">
                      <div className="col-12">
                        {/* Invoice Header */}
                        <div className="mb-4">
                          <h4>
                            Invoice for {customerData[selectedRowIndex].name}
                          </h4>
                          <p>Date: {new Date().toLocaleDateString()}</p>
                        </div>
                        {/* Payments Table */}
                        <table className="table table-bordered border-success mb-4">
                          <thead>
                            <tr>
                              <th className="text-center  text-white bg-success">Sr.</th>
                              <th className="text-center text-white bg-success">Date</th>
                              <th className="text-center  text-white bg-success">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerData[selectedRowIndex].payments
                              .slice()
                              .reverse()
                              .map((payment, paymentIndex) => (
                                <tr key={payment._id}>
                                  <td>{paymentIndex + 1}</td>
                                  <td>{payment.date}</td>
                                  <td>₹{payment.amount}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {/* Products Table */}
                        <table className="table table-bordered border-success">
                          <thead>
                            <tr>
                              <th className="text-center text-white bg-success">Sr.</th>
                              <th className="text-center text-white bg-success">Date</th>
                              <th className="text-center text-white bg-success">
                                Quantity
                              </th>
                              <th className="text-center text-white bg-success">Product Name</th>
                              <th className="text-center text-white bg-success">
                                Purchase Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerData[selectedRowIndex].sales
                              .slice()
                              .reverse()
                              .map((product, productIndex) => (
                                <tr key={product._id}>
                                  <td>{productIndex + 1}</td>
                                  <td>{product.salesDate}</td>
                                  <td>{product.quantity} QTL.</td>
                                  <td>{product.productName}</td>
                                  <td>₹{product.amount}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Print Button */}
               
              </Modal.Body>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default AllCustomer;
