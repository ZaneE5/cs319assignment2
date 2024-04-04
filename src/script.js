import './App.css';
import React, {useState, useEffect} from "react";
import {Products} from "./Products";

//VIEW PRODUCTS AND SEARCH HERE
const Script = () => {
    console.log("Step 1 : load Products in a useState.");
    const [ProductsCategory, setProductsCategory] = useState(Products);
    const [query, setQuery] = useState('');
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        total();
    }, [cart]);

    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const addToCart = (product) => {
        setCart([...cart, product]);
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
        }
    }

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
            
            <span class ="text-gray-700 text-white">Order total:   </span>
            <span class ="text-gray-700 text-white">${cartTotal}</span>
            </div>
        </div>
        <div className="ml-5  p-10 xl:basis-4/5">
            {console.log("Before render :",Products.length,ProductsCategory.length)}
            <div className='category-section fixed'>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-10" style={{ maxHeight: '800px', overflowY: 'scroll' }}>
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
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                                        </a>
                                        <p>Tag - {product.category}</p>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                                    <button type="button" variant="light" onClick={() => removeFromCart(product)} > - </button>{" "}
                                    <button type="button" variant="light" onClick={() => addToCart(product)}> + </button>
                                    ${product.price} <span class="close">&#10005;</span>{howManyofThis(product.id)}
                                </div>
                                <p className="text-sm font-medium text-green-600">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}

export default Script;