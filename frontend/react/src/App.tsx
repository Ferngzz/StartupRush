import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {BattlePage} from "./pages/BattlePage.tsx";
import {ChampionPage} from "./pages/ChampionPage.tsx";
import {StatsPage} from "./pages/StatsPage.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {RecordPage} from "./pages/RecordPage.tsx";
import * as React from "react";


export const EditionContext = React.createContext({
    edition: 1,
    setEdition: (value: number) => {}
})

function App() {
    const [edition, setEdition] = React.useState(1);

    return (
        <EditionContext.Provider value={{edition, setEdition}}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/SignUp" element={<SignUpPage/>}/>
                    <Route path="/BattlePage" element={<BattlePage/>}/>
                    <Route path="/ChampionPage" element={<ChampionPage/>}/>
                    <Route path="/stats" element={<StatsPage/>}/>
                    <Route path="/record" element={<RecordPage/>}/>
                </Routes>
            </Router>
        </EditionContext.Provider>
    )
}

export default App
