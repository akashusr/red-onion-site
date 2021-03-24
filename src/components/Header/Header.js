import React from 'react';
import logo from '../../Images/ICON/logo2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Header = (props) => {
    const auth = useAuth();
    return (
        <nav className="navbar navbar-expand navbar-light bg-white fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/"><img src={logo} alt=""/></Link>
                <div className="collapse navbar-collapse  d-flex justify-content-end" id="navbarNavAltMarkup">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link text-color"><FontAwesomeIcon icon={faShoppingCart} /> <span className="text-danger">{props.cart.length}</span></Link>
                        </li>
                        <li className="nav-item">
                            {
                                auth.user ?  
                                <Link to="/" className="nav-link">{auth.user.displayName}</Link> 
                                :
                                <Link to="/login" className="nav-link">Login</Link> 
                            }
                        </li>
                        <li className="nav-item">
                        {
                            auth.user ? 
                            <Link to="/" className="nav-link">
                                <button onClick={() => {auth.signOut()}} className="btn btn-danger btn-rounded">Sign Out</button>
                            </Link>
                            :
                            <Link to="/login" className="nav-link">
                                <button className="btn btn-danger btn-rounded">Sign Up</button>
                            </Link>
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;