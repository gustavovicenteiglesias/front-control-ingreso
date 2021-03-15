import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavAdmin from './components/navbar/NavAdmin1';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <div className="container fluid app-border bg-app">
      <NavAdmin/>
      <Footer></Footer>
      
     
    </div>
  );
}

export default App;
