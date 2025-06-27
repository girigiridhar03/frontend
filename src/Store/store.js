import { configureStore } from "@reduxjs/toolkit";
import authReducer from './LoginSlice/ClientAuth'
import productReducer from './productSlice/ProductReducer'
import dashboardReducer from './DashboardSlice/DashboardReducer';

const store = configureStore({
    reducer : {
      authReducer,
      productReducer,
      dashboardReducer
    }
})

export default store