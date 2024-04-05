import './App.css';
import React, {useState, useEffect} from "react";
import Products from "./Products.json";
import {useForm} from "react-hook-form";

//VIEW PRODUCTS AND SEARCH HERE
const Script = () => {
    console.log("Step 1 : load Products in a useState.");
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [query, setQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [viewer,setViewer] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataF,setDataF] = useState({});

    useEffect(() => {
        total();
    }, [cart]);

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const addToCart = (product) => {
        setCart([...cart, product]);
        product.quantity ++;
    }

    const removeFromCart = (product) => {
        let itemFound = false;
        const updatedCart = cart.filter((cartItem) => {
            if (cartItem.id === product.id && !itemFound) {
                itemFound = true;
                return false;
            }
            return true;
        });
        if (itemFound) {
            setCart(updatedCart);
            product.quantity --;
        }
    }

    const cartItems = cart.map((el) => (
        <div key={el.id}>
                {el.title}{" = "}
                ${el.price}
        </div>
    ));

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++){
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };
  
    const handleChange = (e) => {
        setQuery(e.target.value);
        console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
        const results = Products.filter(eachProduct => {
        if (e.target.value === "") return ProductsCategory;
            return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
        });
        setProductsCategory(results);
    }

    const checkout = () => {
        setViewer(1);
    }

    const order = data => {
        setDataF(data);
        setViewer(2);
    }

    const confirm = () => {
        setViewer(0);
        setCart([]);
        setCartTotal(0);
    }

    const return_to_products = () => {
        setViewer(0);
    }

    const return_to_cart = () => {
        setViewer(1);
    }

    if (viewer == 1){
        return (
            <div className="flex fixed flex-row">
                <div className="h-screen  bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%'}}>
                    <div className="px-6 py-4">
                    <h1 className="text-3xl mb-2 font-bold text-white"> COM S 319 Assignment 2 </h1>
                    <p className="text-gray-700 text-white">
                        by - <b style={{ color: 'orange' }}>Zane Eason, Benjamin Diaz</b>
                    </p>
            
                    <span class ="text-gray-700 text-white">Cart total:   </span>
                    <span class ="text-gray-700 text-white">${cartTotal}</span>

                    <div>
            <form onSubmit={handleSubmit(order)} className="container mt-5">
                <div className="form-group">
                    <input {...register("fullName", { required: true })} placeholder="Full Name" className="form-control"/>
                    {errors.fullName && <p className="text-danger">Full Name is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" className="form-control"/>
                    {errors.email && <p className="text-danger">Email is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("creditCard", { required: true })} pattern="^\d{16}$" placeholder="Credit Card" className="form-control"/>
                    {errors.creditCard && <p className="text-danger">Credit Card is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("address", { required: true })} placeholder="Address" className="form-control"/>
                    {errors.address && <p className="text-danger">Address is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("address2")} placeholder="Address 2" className="form-control"/>
                </div>

                <div className="form-group">
                    <input {...register("city", { required: true })} placeholder="City" className="form-control"/>
                    {errors.city && <p className="text-danger">City is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("state", { required: true })} placeholder="State" className="form-control"/>
                    {errors.state && <p className="text-danger">State is required.</p>}
                </div>

                <div className="form-group">
                    <input {...register("zip", { required: true })} pattern="^\d{5}$" placeholder="Zip" className="form-control"/>
                    {errors.zip && <p className="text-danger">Zip is required.</p>}
                </div>
                    <button type="button" className = "btn btn-secondary" variant="light" onClick={() => return_to_products()}> Return</button>

                <button type="submit" className="btn btn-primary">Order</button>
            </form>
                    </div>

                </div>
            </div>
        <div className="ml-5  p-10 xl:basis-4/5">
            <div className='category-section fixed'>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Cart ({cart.length})</h2>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    {cart.map((product, index) => (
                        <div key={index} className="group relative shadow-lg" >
                            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                                <img
                                    alt="Product Image"
                                    src={product.image}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="flex justify-between p-3">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                                    <p className="text-sm font-medium text-green-600">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
            );
    }
    else if (viewer == 2){
        return (
            <div className="flex fixed flex-row">
                {console.log("Step 2 : Return App :",Products.length,ProductsCategory.length)}
                <div className="h-screen  bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
                    <div className="px-6 py-4">
                    <h1 className="text-3xl mb-2 font-bold text-white"> COM S 319 Assignment 2 </h1>
                    <p className="text-gray-700 text-white">
                        by - <b style={{ color: 'orange' }}>Zane Eason, Benjamin Diaz</b>
                    </p>
                    <span class ="text-gray-700 text-white">Please confirm your order</span> <br></br> <br></br>

                    <h2 className="text-3xl font-extrabold tracking-tight text-white category-title">Order Summary</h2>
                    <p className="tracking-tight text-white category-title">Name: {dataF.fullName}</p>
                    <p className="tracking-tight text-white category-title">Email: {dataF.email}</p>
                    <p className="tracking-tight text-white category-title">Credit Card: {dataF.creditCard}</p>
                    <p className="tracking-tight text-white category-title">Location: {dataF.city},{dataF.state} {dataF.zip}</p> <br></br>
                    <p className="tracking-tight text-white category-title">Cart Total: ${cartTotal}</p> <br></br>

                    <button type="button" className = "btn btn-secondary" variant="light" onClick={() => return_to_cart()}> Return</button>
                    <button type="button" className = "btn btn-primary" variant="light" onClick={() => confirm()}> Confirm</button>
                    
                    </div>
                </div>
                <div className="ml-5  p-10 xl:basis-4/5">
            <div className='category-section fixed'>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Ordered Items</h2>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    {cart.map((product, index) => (
                        <div key={index} className="group relative shadow-lg" >
                            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                                <img
                                    alt="Product Image"
                                    src={product.image}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="flex justify-between p-3">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                                        </a>
                                    </h3>
                                    <p className="text-sm font-medium text-green-600">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            </div>
        );
    }
    else if (viewer == 0){
    return (
    <div className="flex fixed flex-row">
	    {console.log("Step 2 : Return App :",Products.length,ProductsCategory.length)}
        <div className="h-screen  bg-slate-800 p-3 xl:basis-1/5" style={{ minWidth: '65%' }}>
            <div className="px-6 py-4">
            <h1 className="text-3xl mb-2 font-bold text-white"> COM S 319 Assignment 2 </h1>
            <p className="text-gray-700 text-white">
                by - <b style={{ color: 'orange' }}>Zane Eason, Benjamin Diaz</b>
            </p>
            <div className="py-10">
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                dark:focus:ring-blue-500 dark:focus:border-blue-500" type="search" value={query} onChange={handleChange} />
            </div>

            <button type="button" className = "btn btn-primary" variant="light" onClick={() => checkout()}> Checkout </button>
            </div>
        </div>
        <div className="ml-5  p-10 xl:basis-4/5">
            {console.log("Before render :",Products.length,ProductsCategory.length)}
            <div className='category-section fixed'>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10" style={{ maxHeight: '550px', overflowY: 'scroll' }}>
                    {ProductsCategory.map((product, index) => (
                        <div key={index} className="group relative shadow-lg" >
                            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                                <img
                                    alt="Product Image"
                                    src={product.image}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="flex justify-between p-3">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                                    <p className="text-sm font-medium text-green-600">${product.price}</p>
                                    <button type="button" className="btn btn-secondary" variant="light" onClick={() => removeFromCart(product)} > - </button>{" "}
                                    <button type="button" className="btn btn-secondary" variant="light" onClick={() => addToCart(product)}> + </button>
                                    ${product.price} <span class="close">&#10005; </span>{howManyofThis(product.id)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
    }
}

export default Script;
