import { createSlice } from '@reduxjs/toolkit'
import { getAllByPlaceholderText } from '@testing-library/react'






const initialState = {

  current_user: { username: "none", photoURL: "" },

  feed: [],

  chat: [],

  messeger: {}





}





export const counterSlice = createSlice({

  name: 'counter',

  initialState,


  reducers: {






    current_user: (state, payload) => {

      // console.log(payload.payload)

      state.current_user = payload.payload



    },



    fetch_feed: (state, payload) => {

      state.feed = payload.payload

    },





    save_chat: (state, payload) => {

      // console.log(payload.payload)
      state.chat = [...state.chat, payload.payload]




    },








  },
})




export const { current_user, fetch_feed, save_chat} = counterSlice.actions

export default counterSlice.reducer