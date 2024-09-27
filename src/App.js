import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import Navbar from './components/navbar';
import Footer from './components/footer';
import Services from './components/services';

import VendorForm   from './components/vendorform';
import Invitation from './components/Invitation';

function App() {
  
  return (
    <Router>
    <div className="App">
      <Navbar />
      {/* <VendorForm /> */}
      <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/vendorform" element={<VendorForm />} />
          <Route path="/invitation" element={<Invitation />} />

          </Routes>
      <Services />
      <Footer />
    </div>
    </Router>
  );
}

export default App;
