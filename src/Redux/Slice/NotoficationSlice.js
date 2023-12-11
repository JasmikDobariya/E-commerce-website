import { createSlice } from '@reduxjs/toolkit'


const NotoficationSlice = createSlice ({
    name: 'notofication',
    initialState: true,
    reducers:{
    showNotifications: (state , action) =>{
     state.push(action.payload)   
    } ,      
    },
});

export const {showNotifications} = NotoficationSlice.actions;
export default NotoficationSlice.reducer