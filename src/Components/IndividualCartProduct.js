import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth,fs} from '../Config/Config'

export const IndividualCartProduct = ({cartProduct,cartProductIncrease,cartProductDecrease}) => {

    const handleProductDecrease=()=>{
        cartProductDecrease(cartProduct);
    }
    const handleProductIncrease=()=>{
        cartProductIncrease(cartProduct);
    }
    const handleCartProductDelete=()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart '+user.uid).doc(cartProduct.ID).delete().then(()=>{
                    // console.log("Successfully Deleted");
                })
            }
        })
    }

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text description'>{cartProduct.description}</div>
            <div className='product-text actualprice'>$ {cartProduct.totalActualPrice}</div>
            {/* <div className='product-text discountedprice'>$ {cartProduct.totalDiscountedPrice}</div> */}
            <span>Quantity</span>
            <div className='product-text quantity-box'>
                <div className='action-btns minus' >
                    <Icon icon={minus} size={20} onClick={handleProductDecrease}/>
                </div>                
                <div>{cartProduct.qty}</div>               
                <div className='action-btns plus' >
                    <Icon icon={plus} size={20} onClick={handleProductIncrease}/>
                </div>
            </div>
            <div className='product-text cart-price'>$ {cartProduct.totalDiscountedPrice}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>DELETE</div>            
        </div>
    )
}