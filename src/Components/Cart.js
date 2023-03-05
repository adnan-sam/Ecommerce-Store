import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import {auth,fs} from '../Config/Config'
import { CartProducts } from './CartProducts';
// import StripeCheckout from 'react-stripe-checkout'
import paymentsrc from '../Images/payment.jpg'

export const Cart = () => {

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FirstName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    // console.log(cartProducts);
    //getting the qty from cartProducts in a separate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    //reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    //getting the TotalProductprice from cartProducts in a separate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.totalDiscountedPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;
    const totalPrice = price.reduce(reducerOfPrice,0);

    console.log(qty);

    let Product;

    //Cart Product Increase Functionality
    const cartProductIncrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        Product.qty=Product.qty+1;
        Product.totalActualPrice=Product.qty*Product.actualprice;
        Product.totalDiscountedPrice=Product.qty*Product.discountedprice;
        //updating in database
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart '+ user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    // console.log("Increment");
                })
            }
            else{
                console.log("User is not logged in to increment");
            }
        })
    }

    //Cart Product Decrease Functionality
    const cartProductDecrease=(cartProduct)=>{
        // console.log(cartProduct);
        Product=cartProduct;
        if(Product.qty>1){
            Product.qty=Product.qty-1;
            Product.totalActualPrice=Product.qty*Product.actualprice;
            Product.totalDiscountedPrice=Product.qty*Product.discountedprice;
            //updating in database
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('Cart '+ user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        // console.log("Decrement");
                    })
                }
                else{
                    console.log("User is not logged in to decrement");
                }
            })
        }
    }

    //state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    //getting cart products
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    },[])

    return (
        <>
            <Navbar user={user} totalProducts={totalProducts} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                            cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                            Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                            Total Price to Pay: <span>₹ {totalPrice}</span>
                        </div>
                        <br></br>
                        {/* <StripeCheckout
                        // For the time being I'm removing the pay with card option
                        ></StripeCheckout> */}
                        {/* <a href="" className='btn btn-success disabled'>PAY USING UPI APP</a> */}
                        <br></br>
                        {/* <a href="" className='btn btn-warning'>PAY CASH TO SHOP OWNER</a> */}
                        <br></br>
                        <h5>OR PAY USING THE BELOW QR CODE</h5>
                        <br></br>
                        <img src={paymentsrc}></img>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}