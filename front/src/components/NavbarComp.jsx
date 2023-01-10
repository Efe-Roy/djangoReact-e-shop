import React, {useEffect} from 'react';
import { Link } from 'react-router-dom'
import { useCartContext } from '../store/cartContext';
import { HiShoppingCart } from 'react-icons/hi';
import { FaArrowRight } from 'react-icons/fa';

export const NavbarComp = () => {
    const { fetchCart , stateCart } = useCartContext();

    const { shoppingCart } = stateCart;

    useEffect(() => {
        fetchCart();
    }, []);
    
    // console.log("roy", shoppingCart)
    // console.log("royss", shoppingCart.order_items)

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">
                    <Link className="navbar-brand" to="#">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* right  */}
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/products">Product</Link>
                        </li>
                        
                    </ul>
                    {/* left */}
                    <ul className="navbar-nav ms-auto">
                        
                         <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                             {shoppingCart !== null ? shoppingCart.order_items.length : 0 } <HiShoppingCart className='fs-4'/>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="navbarDropdown">
                                {shoppingCart?.order_items.map((order_item)=>{
                                    return (
                                        <li key={order_item.id} >
                                            <Link className="dropdown-item" to="#">
                                                {order_item.quantity} x {order_item.item.title}
                                            </Link>
                                        </li>
                                    )
                                })}
                                {!shoppingCart ? (
                                <li>
                                    <Link className="dropdown-item" to="#">
                                        No items in your cart
                                    </Link>
                                </li>) : null}
                                
                                <li><hr className="dropdown-divider"/></li>
                                <li><Link className="dropdown-item" to="/order-summary"> <FaArrowRight/> checkout</Link></li>
                            </ul>
                        </li>
                        
                        {loggedInUser? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#">Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                </div>
            </nav>
            
        </React.Fragment>
    )
}
