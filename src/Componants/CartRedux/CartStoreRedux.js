import { configureStore } from "@reduxjs/toolkit";
import {cartItems } from '../Cart/Cart'

export const CartRedux =  configureStore({
    reducer:{
        cartItems
    }
})