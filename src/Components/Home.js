import React,{useState, useEffect} from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import {auth,fs} from '../Config/Config'
import {IndividualFilteredProduct} from './IndividualFilteredProduct'
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

    // categories list rendering using span tag
    const [spans]=useState([
        {id: 'Paints', text: 'Paints'},
        {id: 'Distemper', text: 'Distemper'},
        {id: 'Adhesive', text: 'Adhesive'},
        {id: 'Cleaning', text: 'Cleaning'},
        {id: 'SanitaryWare', text: 'Sanitary Ware & Faucets'},
        {id: 'Tools', text: 'Tools'},
        {id: 'Locks', text: 'Locks'},
        {id: 'DoorHardware', text: 'Door Hardware'},
        {id: 'GlassFittings', text: 'Glass Fittings & Accessories'},    
        {id: 'Electrical', text: 'Electrical'}        
    ])

    // active class state
    const [active, setActive]=useState('');

    //category state
    const [category, setCategory]=useState('All Products');

    // handle change... it will set category and active states
    const handleChange=(individualSpan)=>{
        setActive(individualSpan.id);
        setCategory(individualSpan.text);
        filterFunction(individualSpan.text);
    }

    // filtered products state
    const [filteredProducts, setFilteredProducts]=useState([]);

     // filter function
     const filterFunction = (text)=>{
        if(products.length>1){
            console.log("function triggered");
            const filter=products.filter((product)=>product.category===text);
            setFilteredProducts(filter);
        }
        else{
            console.log('no products to filter')
        } 
    }

    // return to all products
    const returntoAllProducts=()=>{
        setActive('');
        setCategory('All Products');
        setFilteredProducts([]);
    }

    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>
            <br></br>
            <div className='container-fluid filter-products-main-box'>
                <div className='filter-box'>
                    <h6>Filter by category</h6>
                    {spans.map((individualSpan,index)=>(
                        <span key={index} id={individualSpan.id}
                        onClick={()=>handleChange(individualSpan)}
                        className={individualSpan.id===active ? active : 'deactivate'}>{individualSpan.text}</span>
                    ))}
                </div> 
                {filteredProducts.length > 0&&(
                  <div className='my-products'>
                      <h1 className='text-center'>{category}</h1>
                      <a href="javascript:void(0)" onClick={returntoAllProducts}>Return to All Products</a>
                      <div className='products-box'>
                          {filteredProducts.map(individualFilteredProduct=>(
                              <IndividualFilteredProduct key={individualFilteredProduct.ID}
                              individualFilteredProduct={individualFilteredProduct}
                              addToCart={addToCart}/>
                          ))}
                      </div>
                  </div>  
                )}
                {filteredProducts.length<1 &&(
                    <>
                        {products.length>0 &&(
                            <div className='my-products'>
                                <h1 className='text-center'>{category}</h1>
                                <div className='products-box'>
                                    <Products products={products} addToCart={addToCart}/>
                                </div>
                            </div>
                        )}
                        {products.length<1 &&(
                            <div className='my-products please-wait'>Please wait....</div>
                        )}
                    </>
                )}
            </div>
        </>
    )
}