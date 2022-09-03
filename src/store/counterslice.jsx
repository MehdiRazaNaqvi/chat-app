import { createSlice } from '@reduxjs/toolkit'








const initialState = {

  current_user: { username: "none", photoURL: "" },

  feed: [],

  chat: [],

  messeger: {},

  users: []





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




    load_chat_users: (state, payload) => {

      // console.log(payload.payload)
      state.users = payload.payload.users
      state.chat = payload.payload.chat

    },







    delete_msg_redux: (state, payload) => {


      state.chat = state.chat.filter(v => v.mess !== payload.payload.mess);


    }






  },
})




export const { current_user, fetch_feed, save_chat, load_chat_users, delete_msg_redux } = counterSlice.actions

export default counterSlice.reducer