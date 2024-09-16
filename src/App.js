import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import Home from './Components/Home/Home';
import CategoryList from './Components/Category/CategoryList';
import ProductList from './Components/Product/ProductList';
import CustomerList from './Components/Customer/CustomerList';
import VendorList from './Components/Vendor/VendorList';
import PurchaseOrderList from './Components/PurchaseOrder/PurchaseOrderList';
import ReceiptList from './Components/Receipt/ReceiptList';
import InvoiceList from './Components/Invoice/InvoiceList';


const App = () =>{
  return(
    <Router>
      <div>
        {/* Horizontal menu  */}
        <nav>
          <ul className='horizontal-menu'>
            <li><Link to = "/">Home</Link></li>
            <li><Link to ="/category">Category</Link></li>
            <li><Link to ="/product">Product</Link></li>
            <li><Link to ="/customer">Customer</Link></li>
            <li><Link to="/vendor">Vendor</Link></li>
            <li><Link to ="/purchaseorder">PurchaseOrder</Link></li>
            <li><Link to="/receipt">Receipt`</Link></li>
            <li><Link to="/invoice">Invoice</Link></li>
          </ul>
        </nav>
        {/* */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryList />}/>
          <Route path="/product" element={<ProductList />} /> 
          <Route path="/customer" element={<CustomerList />} />
          <Route path="/vendor" element={<VendorList />} />
          <Route path="/purchaseorder" element={<PurchaseOrderList />} />
          <Route path="/receipt" element={<ReceiptList />} />
          <Route path="/invoice" element={<InvoiceList />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;


