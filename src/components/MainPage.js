import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'

import { ImSpinner9 } from "react-icons/im";

const MainPage = ({setMyProduct}) => {

    const productId = useRef()
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)    // tikrinimui ar uzsikrove is serverio
    const [exampleNum, setExampleNum] = useState("")
    const numEx=useRef()

    const setnumEx=()=>{
        console.log(numEx.current.textContent)
        // setExampleNum(numEx.current.textContent)
    }

    const getinfo =async()=>{
        const product = productId.current.value
        const options = {                           // POST standartine dalis
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({product})              // per cia perduodam duomenis
          } 
      
          const res = await fetch("http://localhost:4000/getproduct", options)
          const data = await res.json()
          setLoading(true)
          console.log("data", data)
          setMyProduct(data.resp)
          nav(`/product/${product}`)


        console.log("get info ", product)
    }

    // useEffect(() => {
    //     setnumEx()
    //     console.log("zzz"); 
    //   }, [exampleNum]);



  return (
    <div>
        <h1>Main Page</h1> 
        <h3><i>(AliExpress Scraper based product info application)</i></h3>
        <label>Product ID: </label><br></br>
        <input type="text" size="40" ref={productId} defaultValue={exampleNum}/><br></br><br></br>
        <button onClick={()=>{getinfo(); setLoading(false)}}>Get info</button>
        
            <div className='d-flex column ali-start just-start examples' >
                <p>Products ID for example:</p>
                <li onClick={()=>setnumEx()} ref={numEx}>4001239241217</li>
                <li onClick={()=>setnumEx()} ref={numEx}>1005002899500373</li>
                <li onClick={()=>setnumEx()} ref={numEx}>1005003673614975</li>
                <li onClick={()=>setnumEx()} ref={numEx}>1005003841279816</li>
                <li onClick={()=>setnumEx()} ref={numEx}>1005003754960741</li>
            </div>
            {!loading && <div >
                    <p>Loading...</p>
                    <ImSpinner9 className="rotate anime "/> 
                    </div>  }
        
        
    </div>
    );
};

export default MainPage;
