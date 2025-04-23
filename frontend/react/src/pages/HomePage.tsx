import Grid from "@mui/material/Grid";
import startupRushLogo from '../assets/sr_logo.svg'
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {EditionContext} from "../App.tsx"
import {Tournament} from "../interfaces/Tournament.ts";
import {useContext} from "react";


export function HomePage(){
    const navigator = useNavigate();
    const {edition, setEdition } = useContext(EditionContext);

    const startTournament = async () => {
        const res = await fetch("/tournament/get", {
            method: "GET",
        })
        const data = await res.json()

        console.log(data)
        console.log("edition: " + edition)


        if (res.status == 404 || data.data.length == 0) {
            const firstTournament: Tournament = {
                tournament_edition: 1,
            }

            console.log(firstTournament)


            const toSend = JSON.stringify(firstTournament)

            await fetch("/tournament/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: toSend,
            })

            setEdition(1)

        } else {
            const tournament: Tournament = {
                tournament_edition: edition,
            }

            console.log(tournament)


            const toSend = JSON.stringify(tournament)

            await fetch("/tournament/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: toSend,
            })

            console.log("edition: " + edition)
            setEdition(edition + 1)
            console.log("edition after: " + edition)

        }

        navigator("/SignUp")
    }

    return(
        <div
            className="homePage"
        >

        <Grid container
              direction="column"
        >

                <img className="homePageLogo" src={startupRushLogo} alt="logo"/>

                <Grid container
                    className="homePageButtons">
                    <Button variant="contained"
                            onClick={() => {
                                startTournament()
                            }}
                    >Start</Button>

                    <Button variant="contained"
                            onClick={() => {
                                navigator("/record")
                            }}
                    >Record</Button>
                </Grid>
            </Grid>
        </div>
    );
}