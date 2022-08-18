import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3002/todo"
const initialState = {
    loadings: false,
    todos:[
        {
            id: 0,
            text: 'first',
            done: false,
        },
    ],
    error: ""
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    return axios.get(BASE_URL).then(res => res.data)
})
const todoSlice = createSlice({
    name: "todos",
    initialState,
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.loadings= true
        },
        [fetchTodos.fulfilled]: (state , action) => {
            state.loadings= false;
            state.todos= action.payload
        },
        [fetchTodos.rejected]: (state) => {
            state.loadings= false;
            state.error = "some thing went wrong :( "
        }
    }
})


export default todoSlice.reducer 