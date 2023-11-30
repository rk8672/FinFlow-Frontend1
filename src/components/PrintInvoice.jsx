import PropTypes from 'prop-types';
import { Button, Modal } from "react-bootstrap";

const PrintInvoice = ({ customerData, selectedRowIndex, mdShow, handleCloseModal }) => {
  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print Invoice</title>');
    printWindow.document.write('<link rel="stylesheet" href="path-to-your-styles.css" type="text/css" />');
    printWindow.document.write('</head><body>');
    
    // Invoice Header
    printWindow.document.write(`
      <div class="invoice-header">
        <h2>Invoice for ${customerData[selectedRowIndex].name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
      </div>
    `);

    // Payments Table
    printWindow.document.write(`
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${customerData[selectedRowIndex].payments.slice().reverse().map((payment, paymentIndex) => `
            <tr>
              <td>${paymentIndex + 1}</td>
              <td>${payment.date}</td>
              <td>₹${payment.amount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `);

    // Products Table
    printWindow.document.write(`
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Kendra</th>
            <th>Purchase Amount</th>
          </tr>
        </thead>
        <tbody>
          ${customerData[selectedRowIndex].products.slice().reverse().map((product, productIndex) => `
            <tr>
              <td>${productIndex + 1}</td>
              <td>${product.purchaseDate}</td>
              <td>${product.quantity} QTL.</td>
              <td>${product.brandName}</td>
              <td>₹${product.amount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `);

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  return (
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
          <Modal.Body>
            {/* Print Button */}
            <div className="text-center">
              <Button onClick={printInvoice} className="btn btn-primary">
                Print Invoice
              </Button>
            </div>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

PrintInvoice.propTypes = {
    customerData: PropTypes.array.isRequired,
    selectedRowIndex: PropTypes.number,
    mdShow: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
  };
  

export default PrintInvoice;
