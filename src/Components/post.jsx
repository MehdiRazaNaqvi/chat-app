
import "../Style/post.css"
import { useDispatch, useSelector } from "react-redux"

import { auth } from "../config/firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"

import { current_user } from "../store/counterslice"




const App = () => {
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()





    const google_login = () => {






        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {



                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;



                const obj = { username: user.displayName, photoURL: user.photoURL, providerId: user.providerId }


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
        <div className="post_base">


            <div className='navbar'>

                <img src="https://img.icons8.com/ios/50/000000/airtable.png" className='logo' />

                <span className="nav_span_right">



                    {count.current_user.username != "none" ?

                        <img src={count.current_user.photoURL} className='nav_img' referrerPolicy='no-referrer' />

                        :
                        <p className="nav_text" onClick={() => google_login()}>Log in</p>
                    }


                    <p className="nav_text">Post</p>
                    <p className="nav_text" >Chat</p>

                </span>

            </div>


            <div className="post_bottom">

                            <div className="actual_post" >
                                <div className="user_info_tab">

                                </div>

                                <div className="pic_tab" ></div>

                            </div>

            </div>


        </div>
    )

}


export default App