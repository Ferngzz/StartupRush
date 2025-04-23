import startupRushLogo from '../assets/sr_logo.svg'
import '../App.css'


export function Header() {
    return (
        <div className="header">
            <img className="logo" src={startupRushLogo} alt="Startup Rush Logo"/>
        </div>
    );
}