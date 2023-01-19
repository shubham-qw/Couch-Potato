import React from 'react'
import Table from 'react-bootstrap/Table';
import img1 from "../Screen/trash.png"
import { useCart, useDispatchCart } from "../components/contextReducer";


export default function Cart() {
    const data = useCart();
    let dispatch = useDispatchCart();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: localStorage.getItem("userEmail"), order: data, order_date: new Date().toDateString() })
        });
        console.log((await response).status);
        if ((await response).status === 200) {
            dispatch({ type: "empty" });
        }
    }
    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center text-white fs-3">Cart Khali hai !!</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <Table striped bordered hover className="table  table-hover">
                    <thead className=" text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Option</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((order, index) => {
                                return (<tr key={order.id}>
                                    <th className='text-white' scope="row">{index + 1}</th>
                                    <td className='text-white'>{order.name}</td>
                                    <td className='text-white'>{order.size}</td>
                                    <td className='text-white'>{order.qty}</td>
                                    <td className='text-white'>{order.price}</td>
                                    <td className='text-white'><button type="button" className='btn p-0 bg-white' onClick={() => { dispatch({ type: "remove", index: index }) }}><img src={img1} alt="delete"></img></button></td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <div><h1 className="fs-2 text-white">Total Price : {totalPrice}/-</h1></div>
                <div><button className="btn bg-warning text-white active mt-5" onClick={handleSubmit}>Place Order</button></div>
            </div>
        </div>
    )
}
