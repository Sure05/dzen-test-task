import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {product, product2} from "@/pages/orders";
import {Products} from "@/types/products";

const products = [product,product,product,product,product,product2,product2,product2]

const initialState: {
    loading: boolean,
    data: Products,
    selectedModel: null | string
} = {
    loading: false,
    data: [],
    selectedModel: null
}

export const fetchProducts = createAsyncThunk(
    'products/fetch',
    async () => {
        return await new Promise<Products>((resolve) => {
            setTimeout(() => {
                resolve(products)
            })
        })
    }
)

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSelectedModel: (state, action) => {
            state.selectedModel = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action: {payload: Products}) => {
            state.loading = false;
            state.data = action.payload
        })
        builder.addCase(fetchProducts.rejected, state => {
            state.loading = true
        })
    }
})
export const {setSelectedModel} = ProductSlice.actions
export default ProductSlice.reducer

