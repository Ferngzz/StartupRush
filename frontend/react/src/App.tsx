import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {BattlePage} from "./pages/BattlePage.tsx";
import {ChampionPage} from "./pages/ChampionPage.tsx";
import * as React from "react";

export const EditionContext = React.createContext(1)

function App() {

    return (
        <EditionContext.Provider value={1}>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUpPage/>}/>
                    <Route path="/BattlePage" element={<BattlePage/>}/>
                    <Route path="/ChampionPage" element={<ChampionPage/>}/>
                </Routes>
            </Router>
        </EditionContext.Provider>
    )
}

export default App
