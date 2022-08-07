import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Navbar from "../components/Navbar";
import '../styles/addItem.css'
import { useForm } from 'react-hook-form';
import { createItem, addIMG } from "../http/itemsAPI";
import { Toast, ToastContainer } from "react-bootstrap";

const AddItem = observer(() => {

    const {register, formState: { errors }, handleSubmit, reset} = useForm({ mode: 'onBlur' });
    const [error, setError] = useState('')
    const [showToast, setShowToast] = useState(false)

    async function addItem(data){
        await createItem(data.brand, data.name, data.img[0].name, data.price).then((res) => {
            if(res.data.message){
                toastError(res.data.message)
            }else{
                addIMG(data.img[0]);
                toastError("Item added")
            }
        })
    }

    function toastError(message) {
        setError(message)
        setShowToast(true)
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
            <div className="addItemPage">
                <p>ADD ITEM</p>
                <div className="formItem">
                    <input placeholder="BRAND" {...register('brand', { required: true })}></input>
                    <input placeholder="NAME" {...register('name', { required: true })}></input>
                    <input placeholder="PRICE" {...register('price', { required: true, pattern: /[0-9]{1,}/ })}></input>
                    <input type="file" name="img" placeholder="IMG" {...register('img', { required: true })}></input>
                </div>
                <button onClick={handleSubmit(addItem)}>SUBMIT</button>
            </div>
        </div>
    )
})

export default AddItem;