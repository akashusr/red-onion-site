import React from 'react';
import './Footer.css'
import logo from '../../Images/ICON/logo2.png';
const Footer = () => {
    const getCurrentDate = () => {
        const year = new Date().getFullYear();
        return year;
    }

    return (
        <div className="container mt-5">
            <footer className="bg-dark py-3">
                <div className="container">
                    <div className="row footer-top py-3">
                        <div className="col-md-6 mb-5">
                            <img src={logo} alt="Hot Onion White Logo" />
                        </div>
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <li><a href="/">About Online Food</a></li>
                                <li><a href="/">Read Our Blog</a></li>
                                <li><a href="/">Sign up to deliver</a></li>
                                <li><a href="/">Add your restaurant</a></li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <ul className="list-unstyled">
                                <li><a href="/">Get Help</a></li>
                                <li><a href="/">Read FAQ</a></li>
                                <li><a href="/">View All Cities</a></li>
                                <li><a href="/">Restaurants near me</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom d-flex justify-content-between align-items-center">
                        <small className="text-secondary">Copyright &copy; {getCurrentDate()} </small>
                        <ul className="list-inline">
                            <li className="list-inline-item ml-3"><a href="/">Privacy Policy.</a></li>
                            <li className="list-inline-item  ml-3"><a href="/">Terms of Use</a></li>
                            <li className="list-inline-item  ml-3"><a href="/">Pricing</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;