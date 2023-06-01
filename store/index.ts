// config the store
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import orderSlice from "@/store/slice/OrderSlice";
import productSlice from "@/store/slice/ProductSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            orders: orderSlice,
            products: productSlice
        },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
