import React,{useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import {auth,fs} from '../Config/Config'
// import { BoltLoader } from "react-awesome-loaders";

export const Home = (props) => {

    //getting current user UID
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid(); //current user UID is stored in this and now we can use this to check which user is logged in

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

    //state of products
    const [products, setProducts]=useState([]);

    //getting products function
    const getProducts = async ()=>{
        const products = await fs.collection('Products').get();
        const productsArray = [];
        for(var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

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

    let cartProduct;

    const addToCart = (product)=>{
        if(uid!==null){
            // console.log(product);
            cartProduct=product;
            cartProduct['qty']=1;
            cartProduct['totalActualPrice']=cartProduct.qty*cartProduct.actualprice;
            cartProduct['totalDiscountedPrice']=cartProduct.qty*cartProduct.discountedprice;
            fs.collection('Cart '+ uid).doc(product.ID).set(cartProduct).then(()=>{
                console.log("Successfully added to your cart");
            })
        }
        else{
            props.history.push('/login');
        }
    }

    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>
            <br></br>
            {products.length>0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {products.length<1 && (
                <div className='container-fluid'>
                {/* <BoltLoader
                    className={"loaderbolt"}
                    boltColor={"#6366F1"}
                    backgroundBlurColor={"#E0E7FF"}
                /> */}
                Please Wait Items are loading....
                </div>
            )}
        </>
    )
}