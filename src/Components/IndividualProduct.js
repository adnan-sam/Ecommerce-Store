import React from 'react'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    // console.log(individualProduct);

    const handleAddToCart=()=>{
        addToCart(individualProduct);
    }
    
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualProduct.title}</div>
            <div className='product-text description'>{individualProduct.description}</div>
            <div className='product-text actualprice'>₹ {individualProduct.actualprice}</div>
            <div className='product-text discountpercent'>{(((individualProduct.actualprice-individualProduct.discountedprice)/individualProduct.actualprice)*100).toFixed(0)} % off</div>
            <div className='product-text discountedprice'>₹ {individualProduct.discountedprice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div> 
    )
}