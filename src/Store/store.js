import { configureStore } from "@reduxjs/toolkit";
import authReducer from './LoginSlice/ClientAuth'
import productReducer from './productSlice/ProductReducer'

const store = configureStore({
    reducer : {
      authReducer,
      productReducer
    }
})

export default store