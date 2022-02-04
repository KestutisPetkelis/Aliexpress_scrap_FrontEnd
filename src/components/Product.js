import React from 'react';
import {useNavigate} from 'react-router-dom'

import { MdStarRate} from "react-icons/md";
import { MdOutlineStarRate} from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";

import SimpleImageSlider from "react-simple-image-slider";

import parse from "html-react-parser"

const Product = ({myProduct}) => {

    const nav=useNavigate()
    // Funkcija atvaizduoti zvaigzdutems priklausomai nuo reitingo
    const allStars = (a) =>{
        if(a>= 0 && a<0.5) return(<div><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/></div>)
        if(a >=0.5 && a<1.5) return(<div><MdStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/></div>)
        if(a>= 1.5 && a <2.5) return(<div><MdStarRate className='star'/><MdStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/></div>)
        if(a>=2.5 && a <3.5) return(<div><MdStarRate className='star'/><MdStarRate className='star'/><MdStarRate className='star'/><MdOutlineStarRate className='star'/><MdOutlineStarRate className='star'/></div>)
        if(a >=3.5 && a<4.5) return(<div><MdStarRate className='star'/><MdStarRate className='star'/><MdStarRate className='star'/><MdStarRate className='star'/><MdOutlineStarRate className='star'/></div>)
        if(a >= 4.5) return(<div><MdStarRate className='star'/><MdStarRate className='star'/><MdStarRate className='star'/><MdStarRate className='star'/><MdStarRate className='star'/></div>)
    }

    const pics = myProduct.images.map(x => x={url: x}) //suformuojam atvaizdavimui per <SimpleImageSlider> masyva
    const title = myProduct.title.replace(/&#39;/, "'") // kad atvaizduotu (') normaliai
    


  return (
    <div>
        <div className='d-flex'>
            <button onClick={()=>nav("/")} className="btn"><RiArrowGoBackFill/>Back to Main Page</button>
            <div className='header flex1'>
                <h2>Product Info</h2>
            </div>
        </div>
        {/* {myProduct.description} */}
        <div className='d-flex '>
            <div className='box'> 
            <SimpleImageSlider
                width={300}
                height={300}
                images={pics}
                showBullets={true}
                showNavs={true}
            />
            </div>
            <div className='infodiv'>
                <h3>{title}</h3>
                <div className='container bg-lblue'>
                    {parse(myProduct.description)}
                </div>
               <p>Price (min - max): <b>{myProduct.salePrice.min} - {myProduct.salePrice.max} €</b></p>
               <p>Rating:  <b>{myProduct.ratings.averageStar}</b></p>
               <p>{allStars(myProduct.ratings.averageStar)}</p>
            </div>
        </div> 
        <h2>Comments:</h2>
        <div>
            {myProduct.feedback.map((x,index)=>
                <div className='container2' key={index}>
                    <p>Name: {x.name}</p>
                    <p>Display name: {x.displayName}, {x.country}</p>
                    <p>{allStars(x.rating)}</p>
                    <p>{x.content}</p>

                </div>
            )}
        </div>   
    </div>
    );
};

export default Product;
