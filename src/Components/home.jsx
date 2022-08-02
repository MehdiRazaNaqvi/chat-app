import '../Style/home.css';



import { useSelector, useDispatch } from 'react-redux';
import { current_user } from "../store/counterslice"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { auth } from "../config/firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"



const App = () => {

    const defaultimg = "https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg"


    const navigate = useNavigate();
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()


    const [preview, setPreview] = useState("");



    const checkImage = (e) => {

        const file = e.target.files[0]
        setPreview(URL.createObjectURL(file))

    }




    const google_login = () => {






        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {



                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;



                const obj = { username: user.displayName, photoURL: user.photoURL, providerId: user.providerId }


                dispatch(current_user(obj))
                navigate("/post")




            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // const email = error.email;

                // const credential = GoogleAuthProvider.credentialFromError(error);

            });





    }






    return (
        <div className='home_base' >


    






            <div className="page1"  >

                <div className="partial left">

                    <button onClick={() => google_login()}>Continue with Google</button>
                    <button onClick={() => navigate("/chat")}>Continue to Chat</button>
                    <button onClick={() => navigate("/post")}>Continue to Feed</button>



                    {/* <input type="file" onChange={(e) => checkImage(e)} /> */}
                    {/* <img className='imagepreview' src={preview || defaultimg} /> */}

                </div>


                <div className="partial right"></div>



            </div>





            <div>

            </div>


        </div >

    )
}


export default App