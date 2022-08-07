import React, { useEffect, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import Navbar from "../components/Navbar";
import { getAllItems, getAllForBrand, getBrands } from "../http/itemsAPI";
import '../styles/shop.css'
import { Context } from "..";
import { Toast, ToastContainer } from "react-bootstrap";

const Shop = observer(() => {

    const [items, setItems] = useState([])
    const [brands, setBrands] = useState([])
    const { cart } = useContext(Context);
    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)

    function toastError(message) {
        setError(message)
        setShowToast(true)
    }

    function render(){
        getAllItems().then((data) => {
            setItems(data.data)
        })
        getBrands().then((data) => {
            setBrands(data.data)
        })
    }

    async function getAll(){
        await getAllItems().then((data) => {
            setItems(data.data)
        })
    }

    async function getForBrands(brand){
        await getAllForBrand(brand).then((data) => {
            setItems(data.data)
        })
    }

    function addItemToCart(item){
        let cartItem = false;
        for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === item.name) {
            cartItem = true;
            toastError('Item is already in the cart')
            window.scrollTo(0,0);
        }
        }
        if (!cartItem) {
            cart.push(item);
            toastError('Item add to cart')
            window.scrollTo(0,0);
        }
    }

    useEffect(()=>{
        render()
    }, [])

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
            <div className="shopPage">
                <div className="shopLeftBar">
                    <div className="brandButton" onClick={()=> {getAll()}}>All</div>
                    {
                        brands.map((item) => {
                            return(
                            <div className="brandButton" onClick={(e) => {getForBrands(e.target.innerHTML)}}>
                                {item.brand}
                            </div>
                            )
                        })
                    }
                </div>
                <div className="shopMain">
                    {
                        items.map((item) => {
                            return(
                            <div className="shopItem">
                                <img src={'https://mobilestoresntu.herokuapp.com/' + item.img}></img>
                                <div className="buyBlock">
                                    <span className="fw-bold fs-3">{item.brand}</span>
                                    <span>{item.name}</span>
                                    <span>Price: {item.price}$</span>
                                    <button onClick={() => {item.amount = 1; addItemToCart(item)}}>BUY</button>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
})

export default Shop;