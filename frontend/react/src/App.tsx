import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {BattlePage} from "./pages/BattlePage.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUpPage/>} />
                <Route path="/" element={<SignUpPage/>} />
                <Route path="/BattlePage" element={<BattlePage/>} />
            </Routes>
        </Router>
    )
}

export default App
