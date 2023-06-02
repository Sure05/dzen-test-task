import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Models} from "@/types/filter";
import axios from "axios";

type ModelsTypes = ['motherboard', 'monitor'][number] | []

type InitialStateType = {
    data: string[],
    selected: string
}

const initialState: InitialStateType = {
    data: [],
    selected: ''
}

export const fetchFilters = createAsyncThunk(
    'filters/fetch',
    async () => {
        const response = await axios.get('/api/filter');
        return response.data.modelCategories
    }
)

const FiltersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSelectedFilter: (state, action) => {
            state.selected = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export const {setSelectedFilter} = FiltersSlice.actions

export default FiltersSlice.reducer
