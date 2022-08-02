import { createSlice } from '@reduxjs/toolkit'






const initialState = {

  current_user: {username : "none"},

  feed : [{username : "jamil" , pic : "" , user_pic : ""} , {} , {}]





}





export const counterSlice = createSlice({

  name: 'counter',

  initialState,


  reducers: {






    current_user: (state, payload) => {

      // console.log(payload.payload)

      state.current_user = payload.payload



    },


    












  },
})




export const { current_user , } = counterSlice.actions

export default counterSlice.reducer