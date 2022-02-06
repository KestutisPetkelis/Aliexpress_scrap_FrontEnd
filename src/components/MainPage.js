import React from 'react';
import { useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom'

import { ImSpinner9 } from "react-icons/im";  // spinerio ikonele

const MainPage = ({setMyProduct}) => {

    const productId = useRef()
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)    // tikrinimui ar uzsikrove is serverio
    const [exampleNum, setExampleNum] = useState("") // duomenu perdavimui i defaultValue reiksme <input> lauke 
    
    const setnumEx=(e)=>{
        console.log(e, e.target.innerText)
        setExampleNum(e.target.innerText)
    }

    const getinfo =async()=>{
        const product = productId.current.value
        const options = {                           // POST standartine dalis
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({product})              // per cia perduodam duomenis
          }                                 // kadangi product yra ne objektas, ji perduodam kaip objekta {}
      
          const res = await fetch("http://localhost:4000/getproduct", options)
          const data = await res.json()
          setLoading(true)              // pakeiciam  busena, kai ateina duomenys is serverio
          console.log("data", data)
          setMyProduct(data.resp)       // idedam duomenis i myProduct state
          nav(`/product/${product}`)    // pereinam i Product langa


        console.log("get info ", product)
    }
  
  return (
    <div>
        <h1>Main Page</h1> 
        <h3><i>(AliExpress Scraper based product info application)</i></h3>
        <label>Product ID: </label><br></br>
        <input type="text" size="40" ref={productId} defaultValue={exampleNum}/><br></br><br></br>
        <button onClick={()=>{getinfo(); setLoading(false)}}>Get info</button>
        
            <div className='d-flex column ali-start just-start examples' >
                <p> Products ID for example:</p>
                <p>(click on ID)</p>
                <li onClick={(e)=>setnumEx(e)}>4001239241217</li>
                <li onClick={(e)=>setnumEx(e)}>1005002899500373</li>
                <li onClick={(e)=>setnumEx(e)}>1005003673614975</li>
                <li onClick={(e)=>setnumEx(e)}>1005003841279816</li>
                <li onClick={(e)=>setnumEx(e)}>1005003754960741</li>
                <li onClick={(e)=>setnumEx(e)}>32958933105</li>
            </div>
            {!loading && <div >
                    <p>Loading...</p>
                    <ImSpinner9 className="rotate anime "/> 
                    </div>  }
        
        
    </div>
    );
};

export default MainPage;
