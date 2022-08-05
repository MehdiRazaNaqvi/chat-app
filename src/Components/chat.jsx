import { auth } from "../config/firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"



import "../Style/chat.css"

import io from "socket.io-client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { save_chat, current_user } from "../store/counterslice"

import { useDispatch, useSelector } from "react-redux"



const socket = io.connect("https://socket--io.herokuapp.com/")
// const socket = io.connect("http://localhost:5000")









const App = () => {

    const count = useSelector(state => state.counter)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [message, setmessage] = useState('')

    // const [chat, setchat] = useState([])






    console.log(count.chat)



    const sendchat = () => {



        socket.emit("chat", { mess: message, name: count.current_user.username, user_pic: count.current_user.photoURL })



        setmessage('')





    }






    useEffect(() => {

        socket.on("chat", (payload) => {

            // console.log(payload)
            dispatch(save_chat(payload))
            // setchat([...chat, { name: payload.name, mess: payload.mess }])

            // array = [...array, payload]
            // console.log(chat)

        })

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




            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // const email = error.email;

                // const credential = GoogleAuthProvider.credentialFromError(error);

            });





    }





    return (
        <div className="chat_base">


            <div className='navbar'>

                <img onClick={() => navigate("/chat-app")} src="https://img.icons8.com/ios/50/000000/airtable.png" className='logo' />

                <span className="nav_span_right">



                    {count.current_user.username != "none" ?

                        <img onClick={() => google_login()} src={count.current_user.photoURL} className='nav_img' referrerPolicy='no-referrer' />

                        :
                        <p className="nav_text border" onClick={() => google_login()}>Log in</p>
                    }


                    <p className="nav_text" onClick={() => navigate("/chat-app/post")} >Feed</p>
                    <p className="nav_text" onClick={() => navigate("/chat-app/create")} >Post</p>

                </span>

            </div>




            <div className="chat_space">

                {count.chat.map((v, i) => (
                    <div className={count.current_user.photoURL == v.user_pic ? "message_bg own_msg" : "message_bg"} key={i}>

                            <img src={v.user_pic} referrerPolicy="no-referrer" className="text_pic" />
                            {v.mess}


                    </div>
                ))}

            </div>





            {count.current_user.username != "none" ?
                <span className="send_tab" >

                    <input className="form-control" type="text" placeholder="Type message" value={message} onChange={(e) => setmessage(e.target.value)} />

                    <button onClick={() => sendchat()} className=" send_btn btn btn-outline-success">Send</button>

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