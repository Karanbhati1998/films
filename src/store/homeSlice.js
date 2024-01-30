import {createSlice} from "@reduxjs/toolkit"

const homeSlice=createSlice({
    name:"Home",
    initialState:{
        url:{},
        genres:{}
   } ,
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url=action.payload
        },
        getGenures:(state,action)=>{
            state.genres=action.payload
        }

    }
})
export const {getApiConfiguration,getGenures}=homeSlice.actions
export default homeSlice.reducer