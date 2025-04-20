import startupRushLogo from '../assets/startup_rush_logo.svg'
import '../App.css'
import MenuIcon from '@mui/icons-material/Menu';

export function Header() {

    return (
        <div className="header">
            <img src={startupRushLogo} alt="Startup Rush Logo"/>
            <p>Startup Rush</p>
            <MenuIcon className="menuIcon"/>
        </div>
    );
}