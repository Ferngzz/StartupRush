import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {BattlePage} from "./pages/BattlePage.tsx";
import {ChampionPage} from "./pages/ChampionPage.tsx";
import {useState} from "react";

function App() {
const [edition, setEdition] = useState(1);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignUpPage edition={edition}/>} />
                <Route path="/BattlePage" element={<BattlePage/>} />
                <Route path="/" element={<ChampionPage/>} />
            </Routes>
        </Router>
    )
}

export default App
