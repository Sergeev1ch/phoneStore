import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import Navbar from "../components/Navbar";
import '../styles/cart.css'
import { Context } from "..";
import {useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {createOrder} from '../http/ordersAPI'
import {ToastContainer, Toast} from 'react-bootstrap'


const Cart = observer(() => {

    const navigate = useNavigate()
    const { cart, setCart } = useContext(Context);
    const [price, setPrice] = useState();
    const {register, formState: { errors }, handleSubmit, reset} = useForm({ mode: 'onBlur' });
    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        totalPrice();
    }, []);

    function toastError(message) {
        setError(message)
        setShowToast(true)
    }

    function totalPrice() {
        let sum = 0;
        cart.map((item) => {
          sum += item.price * item.amount;
        });
        setPrice(sum);
    }

    function deleteItem(item) {
        cart.splice(cart.indexOf(item), 1);
        navigate('/cart')
    }

    async function makeOrder(data) {
        if (cart.length !== 0) {
            await createOrder(data.name, data.email, data.phone, data.address, cart, price)
            setCart([]);
            reset();
            navigate('/');
        }else{
            toastError('Cart is not empty!')
            window.scrollTo(0,0);
        }
    }

    return (
        <div>
            <Navbar />
            <ToastContainer position={"top-end"} className='mt-3 me-3'>
                <Toast bg="light" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto text-dark">Error</strong>
                    </Toast.Header>
                    <Toast.Body><b>{error}</b></Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="cartPage">
                <div className="orderForm">
                    <p>About me</p>
                    <input placeholder="NAME" {...register('name', { required: true, pattern: /[A-Za-z]{3,}/ })} />
                    <span className="pError"> {errors.name?.type === 'required' ? 'Is not empty' : errors.name?.type === 'pattern' ? 'Not valid' : null}</span>
                    <input placeholder="EMAIL" {...register('email', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                    <span className="pError">{errors.email?.type === 'required' ? 'Is not empty' : errors.email?.type === 'pattern' ? 'Not valid' : null}</span>
                    <input placeholder="PHONE" {...register('phone', { required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ })} />
                    <span className="pError">{errors.phone?.type === 'required' ? 'Is not empty' : errors.phone?.type === 'pattern' ? 'Not valid' : null}</span>
                    <input placeholder="ADDRESS" {...register('address', { required: true })} />
                    <span className="pError">{errors.address?.type === 'required' ? 'Is not empty' : errors.address?.type === 'pattern' ? 'Not valid' : null}</span>
                    <span>Total price: {price}$</span>
                    <button onClick={handleSubmit(makeOrder)}>SUBMIT</button>
            
                </div>
                <div className="cartStore">
                    {
                        cart.map((item) => {
                            return(
                            <div className="cartItem">
                                <img src={'https://mobilestoresntu.herokuapp.com/' + item.img}></img>
                                <div>
                                    <p>{item.brand}</p>
                                    <p>{item.name}</p>
                                    <p>Price: {item.price}$</p>
                                    <input value={item.amount} onChange={(e) => { item.amount = e.target.value; totalPrice(); }} min={1} type="number" />
                                    <div>
                                    <button onClick={() => { deleteItem(item); }}>DELETE</button>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>


)})
export default Cart;