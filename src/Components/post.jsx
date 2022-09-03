
import "../Style/post.css"
import { useDispatch, useSelector } from "react-redux"


import { fetch_feed } from "../store/counterslice"

import { useNavigate } from "react-router-dom"


import Navbar from "../Components/navbar"


import Loader from "../pics/loader.png"

const App = () => {
    const count = useSelector(state => state.counter)
    const dispatch = useDispatch()


  
    








    console.log(count.current_user)





    const liked = (v) => {

        alert("like added")
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        const like_post_data = { uid: count.current_user.uid, _id: v._id }

        {
            v.likers.includes(count.current_user.uid) ? alert("You have already like this post") :

                fetch('https://chat-app-ser.herokuapp.com/liked', {
                    method: "post",
                    headers: headers,

                    body: JSON.stringify(like_post_data)

                })
                    .then(() => fetch_post())

        }


    }







    const delete_post = (v) => {


        alert("deleting your post")

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }



        const del_payload = { id: v._id }



        fetch('https://chat-app-ser.herokuapp.com/delete', {
            method: "post",
            headers: headers,

            body: JSON.stringify(del_payload)

        })
            .then(() => fetch_post())



    }





    const fetch_post = () => {

        console.log("fetching")

        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        }

        fetch('https://chat-app-ser.herokuapp.com/getpost', {
            method: "get",
            headers: headers
        })

            .then(r => r.json())
            .then(data => dispatch(fetch_feed(data)))
    }












    return (
        <div className="post_base">



            <Navbar />




            <div className={count.feed.length < 1 ? "invisible" : "post_bottom"} >





                {count.feed.map((v, i) =>

                    <div className="actual_post" key={i} >

                        <div className="post_info_tab">

                            <span className="pic_and_name">

                                <img src={v.user_pic} referrerPolicy="no-referrer" className="profile_pic" />
                                <p className="user_name" >{v.user_name}</p>

                            </span>


                            {count.current_user.photoURL == v.user_pic ?
                                <span className="img_delete" onClick={() => delete_post(v)} >
                                    <img className="img_cover" src="https://img.icons8.com/external-inkubators-detailed-outline-inkubators/25/000000/external-delete-ecommerce-user-interface-inkubators-detailed-outline-inkubators.png" alt="" />
                                </span>
                                :
                                null
                            }
                        </div>





                        <div className="pic_tab" >
                            <img src={v.pic} className="post_pic" />
                        </div>



                        <div className="likes_tab" >

                            <img referrerPolicy="no-referrer" onClick={() => { count.current_user.username != "none" ? liked(v) : alert("Please log in first") }} src={v.likers.includes(count.current_user.uid) ? "https://img.icons8.com/ios-filled/50/000000/like--v1.png" : "https://img.icons8.com/ios/50/000000/like--v1.png"} className="like_btn" />
                            <p className="likers_len"  >{v.likers.length}</p>

                        </div>






                    </div>

                )
                }


            </div>




            <div className={count.feed.length < 1 ? "loading_div" : "invisible"}>

                <img referrerPolicy="no-referrer" className="loader_img" src={Loader} />

            </div>




        </div>
    )

}


export default App