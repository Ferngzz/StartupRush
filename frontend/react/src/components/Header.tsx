import startupRushLogo from '../assets/sr_logo.svg'
import vsMenuIcon from '../assets/vs_menu_icon_color.svg'
import '../App.css'
import MenuIcon from '@mui/icons-material/Menu';
import {useState, useEffect, useRef} from "react";

export function Header() {
    const [open, setOpen] = useState(false);
    let menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handleOutsideMenuClick = (e: MouseEvent) => {
            /*
             * Verifica se o menu está aberto, se estiver
             * e acontecer click fora, fecha o menu.
             */
            if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideMenuClick);
    })

    return (
        <div className="header">
            <img className="logo" src={startupRushLogo} alt="Startup Rush Logo"/>
            <MenuIcon
                className="menuIcon"
                onClick={() => {setOpen(true)}}
            />

            {
                open ?
                    <div className="menu" ref={menuRef}>
                        <div className="menuContent">
                            <img src={vsMenuIcon} alt="VS Menu Img"/>
                            <p>Home</p>
                        </div>
                        <div className="menuContent">
                            <img src={vsMenuIcon} alt="VS Menu Img"/>
                            <p>Cadastro</p>
                        </div>
                        <div className="menuContent">
                            <img src={vsMenuIcon} alt="VS Menu Img"/>
                            <p>Batalha</p>
                        </div>
                        <div className="menuContent">
                            <img src={vsMenuIcon} alt="VS Menu Img"/>
                            <p>Ranking</p>
                        </div>
                        <div className="menuContent">
                            <img src={vsMenuIcon} alt="VS Menu Img"/>
                            <p>Vencedores</p>
                        </div>
                    </div> : null
            }
        </div>
    );
}