import { Route, Routes, BrowserRouter as Router } from "react-router-dom"


import Home from "./home"
import Post from "./post"
import Create from "./create"


const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </Router>
        </div>
    )
}


export default App