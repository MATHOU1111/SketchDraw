import Home from "./pages/home.jsx";
import Editor from "./pages/editor.jsx";
import { Routes, Route } from 'react-router';
import {BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="" element={<Home />} />
                    <Route path="editor/:idCanvas" element={<Editor />} />
                </Routes>
             </BrowserRouter>
        </div>
    )
}   

export default App;