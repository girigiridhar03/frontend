import { configureStore } from "@reduxjs/toolkit";
import authReducer from './LoginSlice/ClientAuth'
import productReducer from './productSlice/ProductReducer'
import dashboardReducer from './DashboardSlice/DashboardReducer';
import orderReducer from './OrderSlice/OrderReducer'

const store = configureStore({
    reducer : {
      authReducer,
      productReducer,
      dashboardReducer,
      orderReducer
    }
})

export default store