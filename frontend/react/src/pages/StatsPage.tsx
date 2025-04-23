import Grid from "@mui/material/Grid";
import {EditionContext} from "../App.tsx"
import {useContext, useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Header} from "../components/Header.tsx";
import {Team} from "../interfaces/Team.ts"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


export function StatsPage() {
    const [teams, setTeams] = useState<Team[]>([]);
    const {edition} = useContext(EditionContext);
    const navigate = useNavigate();

    const headerStyle = {
        fontWeight: "bold",
        fontFamily: "'JetBrains Mono'",
    }

    const bodyStyle = {
        fontFamily: "'JetBrains Mono'",
    }

    async function getEditionStartups() {
        const response = await fetch(`/startup/${edition}`, {method: "GET"});
        const data = await response.json();
        const tempTeams: any[] = []

        data.data.forEach(t => {
            const teamRows: Team = {
                id_startup: t.id_startup,
                name: t.name,
                slogan: t.slogan,
                score: t.score,
                convincing_pitches: t.convincing_pitches,
                buggy_products: t.buggy_products,
                user_traction: t.user_traction,
                pissed_investor: t.pissed_investor,
                fake_news_pitches: t.fake_news_pitches,
            }
            tempTeams.push(teamRows)
        })

        tempTeams.sort((a, b) => b.score - a.score);

        setTeams(tempTeams)

    }

    console.log(teams);
    useEffect(() => {
        getEditionStartups();
    }, [edition]);

    return (
        <Grid container
              className="statsPage"
              direction="column"
        >
            <Header/>
            <Grid container
                  className="statsPageMainContainer"
                  direction="column"
            >
                <p>Championship {edition} Final Stats</p>

                <TableContainer>
                    <Table className="statsTable">
                        <TableHead>
                            <TableRow className="tableHead">
                                <TableCell align="center" scope="row" sx={headerStyle}>Position</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>Name</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>Score</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>Convincing Pitches</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>Buggy Product</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>Pissed Investor</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>User Traction</TableCell>
                                <TableCell align="center" scope="row" sx={headerStyle}>Fake News</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                teams.map((t, i) => (
                                    <TableRow>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{i + 1}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.name}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.score}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.convincing_pitches}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.buggy_products}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.user_traction}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.pissed_investor}</TableCell>
                                        <TableCell align="center" component="th" scope="row"
                                                   sx={bodyStyle}>{t.fake_news_pitches}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>

            <Grid container
                  className="newTournamentButton">
                <Button
                    onClick={() => {
                        navigate("/")
                    }}
                >Home</Button>
            </Grid>
        </Grid>
    );
}