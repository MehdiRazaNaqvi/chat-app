import { Route, Routes, BrowserRouter as Router } from "react-router-dom"


import Home from "./home"
import Post from "./post"
import Create from "./create"
import Chat from "./chat"





import Priv from "../Components/private"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { api_url } from "../config/api"


import { current_user, load_chat_users, fetch_feed } from "../store/counterslice"


const App = () => {


    const dispatch = useDispatch()




    const fetch_post = () => {

        console.log("fetching")

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        fetch(`${api_url}/getpost`, {
            method: "get",
            headers: headers
        })

            .then(r => r.json())
            .then(data => dispatch(fetch_feed(data)))
    }




    const fetch_chat_users = () => {
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        fetch(`${api_url}/loadchat`, {
            method: "get",
            headers: headers

        })

            .then(r => r.json())
            .then(d => dispatch(load_chat_users(d)))
    }



    


    useEffect(() => {


        fetch_post()


        userExists();

        fetch_chat_users()




    }, []);







    const userExists = () => {



        var userData = JSON.parse(localStorage.getItem("chat-user"));


        userData ?


            dispatch(current_user(userData))




            : console.log("nae hai")







    }







    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/chat-app" element={<Home />} />
                    <Route path="/chat-app/post" element={<Post />} />
                    <Route path="/chat-app/create" element={<Create />} />
                    <Route path="/chat-app/chat" element={<Chat />} />
                    <Route path="/chat-app/private" element={<Priv />} />   

                </Routes>
            </Router>
        </div>
    )
}


export default App