//import { useState } from 'react'
import './App.css'
import {SignUpPage} from "./pages/SignUpPage.tsx";
import {Header} from "./components/Header.tsx";
function App() {
//  const [count, setCount] = useState(0)

    return (
        <>
           <Header/>
           <SignUpPage/>
        </>
    )
}

export default App
