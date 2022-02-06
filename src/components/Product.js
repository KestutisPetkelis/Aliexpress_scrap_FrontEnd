import React from 'react';
import {useNavigate} from 'react-router-dom'

import { MdStarRate} from "react-icons/md";         // pilnavidures zvaigzdutes ikonele
import { MdOutlineStarRate} from "react-icons/md";  // tusciavidures zvaigzdutes ikonele
import { RiArrowGoBackFill } from "react-icons/ri"; // grizimo rodykles ikonele

import SimpleImageSlider from "react-simple-image-slider";  // isidedam gatava slaideri...

import parse from "html-react-parser"   // isidedam parserio biblioteka, kad galetumem atvaizduoti HTML koda is "string" tipo kintamojo

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
    
    let images = []             // masyvas produkto variantu atvaizdavimui
    if(myProduct.variants.options[1]){      // logika variantu apdarojimui del durnos  "kitaiskos" duomenu strukturos
        if(myProduct.variants.options[0].values[0].image){
            images = myProduct.variants.options[0].values
        }else 
        if(myProduct.variants.options[1].values[0].image ){
            images = myProduct.variants.options[1].values
        }
    }

  return (
    <div>
        <div className='d-flex'>
            <button onClick={()=>nav("/")} className="btn"><RiArrowGoBackFill/>Back to Main Page</button>
            <div className='header flex1'>
                <h2>Product Info</h2>
            </div>
        </div>
        
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
                { images.length>0 &&
                    <div>
                        <p>Variants: </p>
                        <div className='d-flex f-wrap'>
                            {images.map((x,index)=>
                            <div key={index}>
                                <img className='variantspics' src={x.image} alt=""/>
                            </div>
                            )}
                        </div>
                    </div>
                }

                <p>Available quantity: <i>{myProduct.totalAvailableQuantity}</i></p>
                <p>Price (min - max): <b>{myProduct.salePrice.min} - {myProduct.salePrice.max} €</b></p>
                <p>Rating:  <b>{myProduct.ratings.averageStar}</b></p>
                <p>{allStars(myProduct.ratings.averageStar)}</p>
            </div>
        </div> 
        <h2>Comments: {myProduct.feedback.length} overall</h2>
        <div>
            {myProduct.feedback.map((x,index)=>
                <div className='container2' key={index}>
                    <p>Name: {x.name}</p>
                    <p>Posted: {x.date.replace("T", " ").slice(0, -8)}</p>
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
