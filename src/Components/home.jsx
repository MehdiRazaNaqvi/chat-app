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









    return (
        <div className='home_base' >


    






           

                <div className="partial left">

                    <img src="https://img.icons8.com/ios/50/000000/airtable.png" className='main_logo'  />
                    <button className='home_btn' onClick={() => navigate("/chat-app/chat")}>Continue to Chat</button>
                    <button className='home_btn' onClick={() => navigate("/chat-app/post")}>Continue to Feed</button>



                    {/* <input type="file" onChange={(e) => checkImage(e)} /> */}
                    {/* <img className='imagepreview' src={preview || defaultimg} /> */}

                </div>


                <div className="partial right">

                    <img src="https://webimages.mongodb.com/_com_assets/cms/globe@2x-kgv9ll4o7r-havl08h54l.png?auto=format%2Ccompress&ch=DPR" className='home_pic' />
                </div>



       





            <div>

            </div>


        </div >

    )
}


export default App