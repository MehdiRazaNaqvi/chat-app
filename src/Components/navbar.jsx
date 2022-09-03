



import { auth } from "../config/firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"



import "../Style/post.css"





import { current_user } from "../store/counterslice"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"




const App = () => {

    const count = useSelector(state => state.counter)

    const dispatch = useDispatch()

    const navigate = useNavigate()



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





    return (


        <div className='navbar'>

            <img onClick={() => navigate("/chat-app")} src="https://img.icons8.com/ios/50/000000/airtable.png" className='logo' />

            <span className="nav_span_right">



                {count.current_user.username != "none" ?

                    <img onClick={() => google_login()} src={count.current_user.photoURL} className='nav_img' referrerPolicy='no-referrer' />

                    :
                    <p className="nav_text border" onClick={() => google_login()}>Log in</p>
                }


                <p className="nav_text" onClick={() => navigate("/chat-app/post")} > <img src="https://img.icons8.com/windows/32/000000/home.png" className="nav-img" /> </p>
                <p className="nav_text" onClick={() => navigate("/chat-app/create")} ><img src="https://img.icons8.com/ios/50/000000/conference-call--v1.png" className="nav-img" /></p>
                <p className="nav_text" onClick={() => navigate("/chat-app/chat")} ><img src="https://img.icons8.com/ios/50/000000/speech-bubble-with-dots.png" className="nav-img" /></p>

            </span>

        </div>


    )
}

export default App