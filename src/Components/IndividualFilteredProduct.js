import React from 'react'

export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualFilteredProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualFilteredProduct.title}</div>
            <div className='product-text description'>{individualFilteredProduct.description}</div>
            <div className='product-text actualprice'>₹ {individualFilteredProduct.actualprice}</div>
            <div className='product-text discountpercent'>{(((individualFilteredProduct.actualprice-individualFilteredProduct.discountedprice)/individualFilteredProduct.actualprice)*100).toFixed(0)} % off</div>
            <div className='product-text discountedprice'>₹ {individualFilteredProduct.discountedprice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleAddToCart}>ADD TO CART</div>
        </div> 
    )
}