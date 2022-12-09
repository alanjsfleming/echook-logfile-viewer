import { createSlice } from '@reduxjs/toolkit'

const initialState=[]

export const dataSlice = createSlice({
    name:'dataSlice',
    initialState,
    reducers:{
        updateData: (state,action) => {
            state=action.payload
        },
    },
})

export const {updateData} = dataSlice.actions

export default dataSlice.reducer