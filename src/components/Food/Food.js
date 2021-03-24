import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';

const Food = (props) => {
    const {price, foodDescription, image, name} = props.food;
    const [quantity, setQuantity] = useState(1);
    const auth = useAuth();

    return (
        <div className="my-5 container pt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1>{name}</h1>
                    <p className="my-5">{foodDescription}</p>
                    <div className="d-flex  my-4">
                        <h2 className="price">{price}</h2>
                        <div className="cart-controller ml-3 btn"> 
                            <button className="btn" onClick={() => setQuantity(quantity <= 1 ? quantity : quantity - 1)}>-</button> {quantity} <button className="btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <p className="d-flex my-5">Quantity: {quantity}</p>
                    <div className="action d-flex align-items-center">
                        <button className="btn btn-danger btn-rounded"><FontAwesomeIcon icon={faCartArrowDown} /> Add</button>
                        {
                            auth.user ?
                            <Link to="/shipment">
                                    <button className="btn btn-danger btn-rounded  ml-4"><FontAwesomeIcon icon={faShippingFast} /> Process To Shipment</button>
                            </Link>
                            :
                            <Link to="/login">
                                    <button className="btn btn-danger btn-rounded  ml-4"><FontAwesomeIcon icon={faShippingFast} /> Process To Shipment</button>
                            </Link>
                        }
                    </div>
                    <div className="more-images mt-5 ">
                        <img height="150px" src={image} alt=""/>
                    </div>
                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={image} alt=""/>
                </div>

            </div>
        </div>
    )
}

export default Food