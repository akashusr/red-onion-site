import React from 'react'
import fakeData from '../../demoData'

const Inventory = () => {
    const handleAddInventory = () => {
        const product = fakeData[0];
        console.log('before post', product);
        fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
        .then(res => res.json())
        .then(data => {
            console.log('Post successfull', data);
        })
    }
    return (
        <div className="container mt-5">
            <h1>Load All product to Database</h1>
            <button onClick={handleAddInventory} className="btn btn-primary">Add Inventory</button>
        </div>
    )
}

export default Inventory;