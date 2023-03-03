import "../Style/create.css"


import { auth } from "../config/firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { signInWithPopup } from "firebase/auth"


import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import { current_user } from "../store/counterslice"
import { useState } from "react";


import FileBase64 from "react-file-base64";

import Navbar from "../Components/navbar"
import { api_url } from "../config/api"


const App = () => {

    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const [preview, setPreview] = useState("");
    const defaultimg = "https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg"




    // const checkImage = (e) => {

    //     const file = e.target.files[0]
    //     setPreview(URL.createObjectURL(file))

    // }



    const sendpost = () => {


        const data = { user_name: count.current_user.username, user_pic: count.current_user.photoURL, pic: preview, likers: [] }

        console.log(data)

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }


        {
            preview == "" ? alert("please select some pic") :


                fetch(`${api_url}/setpost`, {


                    // fetch('http://localhost:4000/setpost', {

                    method: "post",
                    headers: headers,
                    body: JSON.stringify(data)

                })

                    .catch(err => console.log(err))




            alert("You posted sucesfully")
            navigate("/chat-app/post")

        }




    }

    



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
        <div className="create_base">

            <Navbar />


            {

                count.current_user.username != "none" ?

                    <div className="post_pic_div">

                        <div className="confirm" >You are posting as {count.current_user.username} </div>
                        {/* <input  className="input" type="file" onChange={(e) => checkImage(e)} /> */}

                        {/* <input placeholder="Paste image address" className="input_post" type="text" onChange={(e) => setPreview(e.target.value)} /> */}
                        <FileBase64

                            multiple={false}
                            onDone={({ base64 }) => setPreview(base64)}
                        />


                        <img referrerPolicy="no-referrer" className='imagepreview' src={preview || defaultimg} />
                        <button className="create_btn" onClick={() => sendpost()}>Post</button>


                    </div>
                    :

                    <div className="post_pic_div" onClick={() => google_login()}>
                        <p className="login_error" >Log in to Post</p>

                    </div>


            }

        </div>



    )

}
export default App