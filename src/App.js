// import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react'
// import Navbar from './components/Navbar';
import Employeepage from './components/Employeepage';
import Addemployee from './components/Addemployee';
import {
  BrowserRouter,
  Routes,
  Route
  // Link
} from "react-router-dom";

function App() {
  return (
   <div>
    
     <BrowserRouter>
         {/* <Addemployee/> */}
            <Routes>
                {/* <Route index element={<Employeepage/>}/> */}
                {/* <Route path="contact" element={<Contact />} /> */}
                <Route index element={<Employeepage />} />
                <Route path="/employeepage"  element={<Employeepage />}/>
                <Route path="/addemployee" element={<Addemployee />} />
               
             </Routes>
        </BrowserRouter> 
     {/* <Addemployee/> */}
   </div>
  );
}

export default App;
