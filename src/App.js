import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Product from './components/Product';

function App() {
  const divStyle = {
    width: "100%", 
    // height: "100vh",
    border: "1px solid blue",
    borderRadius: "10px",
    margin: "10px",
    padding: "20px",
    backgroundColor: "aliceblue",
    
  };
  const[myProduct, setMyProduct] = useState()

  return (
    <div className="App" style={divStyle}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage setMyProduct={setMyProduct}/>}></Route>
        <Route path="/product/:id" element={<Product myProduct={myProduct}/>}></Route>
        
      </Routes>
     
      </BrowserRouter>
      
    </div>
  );
}

export default App;
