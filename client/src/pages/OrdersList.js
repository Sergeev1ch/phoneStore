import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Navbar from "../components/Navbar";
import '../styles/ordersList.css'
import { getAllOrders } from "../http/ordersAPI";

const OrdersList = observer(() => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrders().then((data) => {
            setOrders(data.data.orders)
        })
    },[])



    return (
        <div>
            <Navbar />
            <div className="ordersPage">
                <p className="ordersPageP">ORDERS</p>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">NAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">PHONE</th>
                        <th scope="col">ADDRESS</th>
                        <th scope="col">CART</th>
                        <th scope="col">TOTAL PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            console.log(order)
                            return(
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.address}</td>
                                    <td>{order.cart.map((cartItem) => {
                                        return (
                                        <p>{cartItem.brand + " " + cartItem.name + " | Amount: " + cartItem.amount + " | Price: " + cartItem.price + "$"}</p>
                                        )
                                    })}</td>
                                    <td>{order.price + "$"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                </div>
        </div>
    )
})

export default OrdersList;