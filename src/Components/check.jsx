import { useState } from "react"
import "../Style/check.css"






const App = () => {


    const [comments, setcomments] = useState(false);

    return (
        <div className="check_base" >



            <div className="main_post">

                <div className= { comments?  "comment_section" : "invisible"} >

                </div>


                <div className="comment_logo" onClick={() => setcomments(!comments)} >
                    See comments

                </div>

            </div>
        </div>
    )

}








export default App