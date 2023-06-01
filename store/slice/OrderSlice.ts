import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {Orders} from '@/types/order'
import axios from "axios";
const initialState = {
    data: [],
    loading: false
} as {
    data: [] | Orders,
    loading: boolean
}

export const fetchOrders = createAsyncThunk(
    'orders/fetch',
    async () => {
        const response = await axios.get('/api/orders');
        return response.data.orders
    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload
        });
    }
})

export default orderSlice.reducer
