import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Table from 'react-bootstrap/Table';
function Orders() {
    const [order, setOrder] = useState([]);

    const load_orders = async () => {
        const response = await fetch("http://localhost:5000/api/myorders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: localStorage.getItem("userEmail") })
        })

        const json = await response.json();
        setOrder(json);
    }

    useEffect(() => {
        load_orders();
    }, []);
    return (
        <div>
            <Navbar />
            <div className="container">
                {
                    order.length != 0 ? order.map((his) => {
                        return (
                            <div className="m-4 mb-5">
                                {
                                    his.map((ohis, index) => {
                                        return (
                                            index == 0 ? <h1>{ohis.order_date}</h1>
                                                :
                                                <div>
                                                <Table striped>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>{ohis.name}</th>
                                                            <th>{ohis.size}</th>
                                                            <th>{ohis.qty}</th>
                                                            <th>{ohis.price}</th>
                                                        </tr>
                                                    </thead>
                                                </Table>
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }) : <h1>No order Placed</h1>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Orders;