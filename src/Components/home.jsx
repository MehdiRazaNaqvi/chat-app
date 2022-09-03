import '../Style/home.css';



import { useSelector, useDispatch } from 'react-redux';
import { current_user } from "../store/counterslice"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import lottie from "lottie-web"
import { useRef } from 'react';





const App = () => {

    


    const navigate = useNavigate();


    const container = useRef(null)







    useEffect(() => {


        lottie.loadAnimation({
            container: container.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: require("../animations/message.json")
        });






    }, [2])




    setTimeout(() => {

        navigate("/chat-app/post")

    }, 3000);




    return (
        <div className='home_base' >







            <div className="animation-div" ref={container}>

            </div>












        </div >

    )
}


export default App