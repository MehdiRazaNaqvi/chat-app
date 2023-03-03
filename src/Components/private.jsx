

import { useSelector } from "react-redux"


import Navbar from "../Components/navbar"


import "../Style/priv.css"





const App = () => {


    const count = useSelector(state => state.counter)

    return (
        <div className="priv-base">



            <Navbar />





            <div className="users-list">

                {
                    count.users.map((v, i) =>

                        <div key={i} className="user-one">

                        </div>


                    )
                }




            </div>



        </div>
    )

}





export default App