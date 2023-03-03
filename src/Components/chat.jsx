import { auth } from "../config/firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"



import "../Style/chat.css"

import io from "socket.io-client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { save_chat, current_user, delete_msg_redux } from "../store/counterslice"

import { useDispatch, useSelector } from "react-redux"

import alanBtn from "@alan-ai/alan-sdk-web"

import Navbar from "../Components/navbar"
import { api_url } from "../config/api"


// const socket = io.connect("https://socket--io.herokuapp.com/")
const socket = io.connect("http://localhost:4000")






const App = () => {

    const count = useSelector(state => state.counter)

    const dispatch = useDispatch()



    const [message, setmessage] = useState('')

    // const [chat, setchat] = useState([])







    const sendchat = () => {



        socket.emit("chat", { mess: message, name: count.current_user.username, user_pic: count.current_user.photoURL, time: time })


        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        fetch(`${api_url}/savechat`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ mess: message, name: count.current_user.username, user_pic: count.current_user.photoURL, time: time })

        })

            .then(r => r.json())
            .then(res => console.log(res))



        setmessage('')







    }







    useEffect(() => {

        socket.on("chat", (payload) => {



            dispatch(save_chat(payload))



        })





        function updateScreen(time) {

            alanBtn({

                key: "5a699ed177a25d52ad3b004399eccbd82e956eca572e1d8b807a3e2338fdd0dc/stage",

                onCommand: (commandData) => {

                    if (commandData.command === "voice-msg") {

                        setmessage(commandData.data)
                        // socket.emit("chat", { mess: message, name: count.current_user.username, user_pic: count.current_user.photoURL, time: time })








                    }


                }
            })
        }





        requestAnimationFrame(updateScreen);





    }, [1])






    const google_login = () => {






        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {



                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;




                const obj = { username: user.displayName, photoURL: user.photoURL, uid: user.uid }


                dispatch(current_user(obj))

                localStorage.setItem("chat-user", JSON.stringify(obj))




            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // const email = error.email;

                // const credential = GoogleAuthProvider.credentialFromError(error);

            });





    }






    const delete_msg = (v) => {

        dispatch(delete_msg_redux(v))



        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        // fetch('http://localhost:4000/delete-msg', {
        fetch(`${api_url}/delete-msg`, {
            method: "post",
            headers: headers,
            body: JSON.stringify(v)

        })

    }










    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();





    return (
        <div className="chat_base" style={{ width: "50rem" }}>


            <Navbar />



            <div className="chat_space" style={{ backgroundColor: "white" }}>

                {count.chat.map((v, i) => (

                    <div className={count.current_user.photoURL == v.user_pic ? "message_bg own_msg" : "message_bg"} key={i}>

                        <img src={v.user_pic} referrerPolicy="no-referrer" className="text_pic" style={{ height: "4rem", width: "4rem" }} />
                        <span style={{ fontSize: "1.2rem", width: "50%", wordBreak: "break-word" }}>  {v.mess} </span>
                        <p style={{ fontSize: "1rem" }} className={count.current_user.photoURL == v.user_pic ? "text-time" : "text-time-other"} >{v.time}</p>



                        <img style={{ height: "2rem", width: "2rem" }} onClick={() => delete_msg(v)} className={count.current_user.photoURL == v.user_pic ? "del-img" : "invisible"} src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/000000/external-delete-ecommerce-user-interface-inkubators-detailed-outline-inkubators.png" />











                    </div>
                ))}

            </div>







            {count.current_user.username != "none" ?

                <span className="send_tab" >

                    <input className="form-control" type="text" placeholder="Type message" value={message} onChange={(e) => setmessage(e.target.value)} />

                    <button onClick={() => sendchat()} className=" send_btn btn btn-outline-success "><img src="https://img.icons8.com/external-febrian-hidayat-flat-febrian-hidayat/50/000000/external-Send-user-interface-febrian-hidayat-flat-febrian-hidayat.png" className="send-icon" /></button>

                </span>


                :



                <span className="send_tab" onClick={() => google_login()} >
                    <p className="login_to_join">Log in to join the chat</p>

                </span>
            }








        </div>
    )
}

export default App