import React from 'react'
import './Banner.css';

const Banner = () => {
    return (
        <div className="container pt-5">
            <section className="banner d-flex justify-content-center align-items-center text-center">
                <div>
                    <h1>Best Food Waiting  for your Belly</h1>
                    
                    <div className="search-box col-md-6 my-5 mx-auto">
                        <input type="text" className="form-control" placeholder="Search Food Item" />
                        <button className="btn btn-danger search-btn btn-rounded btn-sm">Search</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Banner;