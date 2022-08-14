import { Route, Routes, BrowserRouter as Router } from "react-router-dom"


import Home from "./home"
import Post from "./post"
import Create from "./create"
import Chat from "./chat"

import Check from "./check"




const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/chat-app" element={<Home />} />
                    <Route path="/chat-app/post" element={<Post />} />
                    <Route path="/chat-app/create" element={<Create />} />
                    <Route path="/chat-app/chat" element={<Chat />} />

                    <Route path="/chat-app/check" element={<Check />} />

                </Routes>
            </Router>
        </div>
    )
}


export default App