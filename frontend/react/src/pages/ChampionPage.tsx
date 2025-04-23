import Grid from "@mui/material/Grid";
import {useLocation} from "react-router-dom";
import {Header} from "../components/Header.tsx";
import logoPlaceholder from "../assets/team_logo_placeholder.svg"
import congratulations from "../assets/congratulations.svg"
import Button from "@mui/material/Button";

export function ChampionPage() {

    // Vai receber o campeão da BattlePage
    const location = useLocation()
    const tournamentChampion = location.state?.champion


    return (
        <Grid container
              className="championPage"
              direction="column"
        >
            <Header/>
            <Grid container
                  className="championPageMainContainer"
                  direction="column"
                  spacing={4}
            >
                <img className="congratulations" src={congratulations} alt="congratulations"/>
                <img className="championLogo" src={logoPlaceholder} alt={"logo placeholder"}/>
                <p className="championName">{tournamentChampion.name}</p>
                <p className="championSlogan">"{tournamentChampion.slogan}"</p>


                <Grid
                    className="statsButton"
                    container>
                    <Button>Stats</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}