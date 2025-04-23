import {Duel} from "../interfaces/Duel"
import {Team} from "../interfaces/Team"
import {Event} from "../interfaces/Event"
import Grid from "@mui/material/Grid";
import vsLogo from "../assets/vs_menu_icon_color.svg"
import teamLogo from "../assets/team_logo_placeholder.svg"
import winnerLogo from "../assets/winner_logo.svg"
import Button from "@mui/material/Button";
import {Checkbox, FormControlLabel} from "@mui/material";
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded';
import RadioButtonCheckedRounded from '@mui/icons-material/RadioButtonCheckedRounded';
import {useState} from "react";

interface BattleModalProps {
    duel: Duel
    winner: (winner: Team) => void
    onClose: () => void
}

export function BattleModal({duel, winner, onClose}: BattleModalProps) {
    const team1: Team = duel.team1
    const team2: Team = duel.team2

    const [isClicked, setIsClicked] = useState(false)

    const [t1Score, setT1Score] = useState(team1.score);
    const [t2Score, setT2Score] = useState(team2.score);

    const [t1Win, sett1Win] = useState(false);
    const [t2Win, sett2Win] = useState(false);
    const [existsWinner, setExistsWinner] = useState(false)

    const [t1Events, setT1Events] = useState<Event>({
        pitch: false,
        bug: false,
        traction: false,
        investor: false,
        fakeNews: false
    })

    const [t2Events, setT2Events] = useState<Event>({
        pitch: false,
        bug: false,
        traction: false,
        investor: false,
        fakeNews: false
    })

    const t1EventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target
        if (!existsWinner) {
            setT1Events(prevState => ({
                ...prevState,
                [name]: checked
            }))

            if (name === "pitch") {
                setT1Score(prevState => (
                    checked ? prevState + 6 : prevState - 6
                ))
            } else if (name === "bug") {
                setT1Score(prevState => (
                    checked ? prevState - 4 : prevState + 4
                ))
            } else if (name === "traction") {
                setT1Score(prevState => (
                    checked ? prevState + 3 : prevState - 3
                ))
            } else if (name === "investor") {
                setT1Score(prevState => (
                    checked ? prevState - 6 : prevState + 6
                ))
            } else if (name === "fakeNews") {
                setT1Score(prevState => (
                    checked ? prevState - 8 : prevState + 8
                ))
            }
        }
    }
    const t2EventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, checked} = event.target
        if (!existsWinner) {

            setT2Events(prevState => ({
                ...prevState,
                [name]: checked
            }))

            if (name === "pitch") {
                setT2Score(prevState => (
                    checked ? prevState + 6 : prevState - 6
                ))
            } else if (name === "bug") {
                setT2Score(prevState => (
                    checked ? prevState - 4 : prevState + 4
                ))
            } else if (name === "traction") {
                setT2Score(prevState => (
                    checked ? prevState + 3 : prevState - 3
                ))
            } else if (name === "investor") {
                setT2Score(prevState => (
                    checked ? prevState - 6 : prevState + 6
                ))
            } else if (name === "fakeNews") {
                setT2Score(prevState => (
                    checked ? prevState - 8 : prevState + 8
                ))
            }
        }
    }

    const defineWinner = () => {
        if (t1Score > t2Score) {
            sett1Win(true);
            setExistsWinner(true);
            setTimeout(() => {
                updateStartup(team1, t1Events, t1Score + 30)
                updateStartup(team2, t2Events, t2Score)
                team1.score = t1Score + 30
                winner(team1);
                onClose()
            }, 3000)
        } else if (t2Score > t1Score) {
            sett2Win(true);
            setExistsWinner(true);
            setTimeout(() => {
                updateStartup(team2, t2Events, t2Score + 30)
                updateStartup(team1, t1Events, t1Score)
                team2.score = t2Score + 30
                winner(team2);
                onClose()
            }, 3000)
        } else {
            const random = Math.floor(Math.random() * 2);
            if (random === 1) {
                sett1Win(true)
                setExistsWinner(true)
                setT1Score(prevState => (prevState + 2))
                setTimeout(() => {
                    updateStartup(team1, t1Events, t1Score + 30)
                    updateStartup(team2, t2Events, t2Score)
                    team1.score = t1Score + 30
                    winner(team1);
                    onClose()
                }, 3000)
            } else {
                sett2Win(true);
                setExistsWinner(true);
                setT2Score(prevState => (prevState + 2))

                setTimeout(() => {
                    updateStartup(team2, t2Events, t2Score + 30)
                    updateStartup(team1, t1Events, t1Score)
                    team2.score = t2Score + 30
                    winner(team2);
                    onClose()
                }, 3000)
            }
        }
        setIsClicked(true);
    }

    const updateStartup = async (team: Team, flags: Event, score: number) => {
        try {

            const startup: Team = {
                name: team.name,
                slogan: team.slogan,
                id_startup: team.id_startup,
                score: score,
                convincing_pitches: flags.pitch,
                buggy_products: flags.bug,
                user_traction: flags.traction,
                pissed_investor: flags.investor,
                fake_news_pitches: flags.fakeNews,
            }

            const toSend = JSON.stringify(startup)

            //console.log(toSend)

            const res = await fetch(`/startup/update/${team.id_startup}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: toSend
            })

            if (res.ok) {
                console.log("Successfully updated")
            }

        } catch (e: any) {
            if (e.response?.status === 500) {
                console.log("Error updating startup")
            }
        }
    }


    return (
        <Grid container
              className="modalContainer"
              direction="column"
              spacing={2}
        >
            <Grid container>
                <Grid container
                      className="modalTeamContainer"
                      direction="column">
                    <Grid container
                          className="modalTeam"
                          direction="column"
                          spacing={2}>
                        <img src={teamLogo} alt="team 1 logo"/>
                        <p>{team1.name}</p>
                        <p>Score: {t1Score}</p>


                        <Grid container
                              direction="column"
                        >
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Pitch Convincente (+6)"
                                control={
                                    <Checkbox
                                        name={"pitch"}
                                        onChange={t1EventHandler}
                                        checked={t1Events.pitch}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500',
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Produto com bugs (-4)"
                                control={
                                    <Checkbox
                                        name={"bug"}
                                        onChange={t1EventHandler}
                                        checked={t1Events.bug}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Boa tração de usuários (+3)"
                                control={
                                    <Checkbox
                                        name={"traction"}
                                        onChange={t1EventHandler}
                                        checked={t1Events.traction}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Investidor Irritado (-6)"
                                control={
                                    <Checkbox
                                        name={"investor"}
                                        onChange={t1EventHandler}
                                        checked={t1Events.investor}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Fake news no pitch (-8)"
                                control={
                                    <Checkbox
                                        name={"fakeNews"}
                                        onChange={t1EventHandler}
                                        checked={t1Events.fakeNews}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                        </Grid>
                    </Grid>
                    {
                        t1Win ? <img className="modalWinner" src={winnerLogo} alt="winner"/> : <div className="spacer"/>
                    }
                </Grid>

                <img className="modalVs" src={vsLogo} alt="vsLogo"/>

                <Grid container
                      direction="column"
                      className="modalTeamContainer">
                    <Grid container
                          className="modalTeam"
                          direction="column"
                          spacing={2}>
                        <img src={teamLogo} alt="team 1 logo"/>
                        <p>{team2.name}</p>
                        <p>Score: {t2Score}</p>
                        <Grid container
                              direction="column"
                        >
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Pitch Convincente (+6)"
                                control={
                                    <Checkbox
                                        name={"pitch"}
                                        onChange={t2EventHandler}
                                        checked={t2Events.pitch}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500',
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Produto com bugs (-4)"
                                control={
                                    <Checkbox
                                        name={"bug"}
                                        onChange={t2EventHandler}
                                        checked={t2Events.bug}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Boa tração de usuários (+3)"
                                control={
                                    <Checkbox
                                        name={"traction"}
                                        onChange={t2EventHandler}
                                        checked={t2Events.traction}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Investidor Irritado (-6)"
                                control={
                                    <Checkbox
                                        name={"investor"}
                                        onChange={t2EventHandler}
                                        checked={t2Events.investor}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                            <FormControlLabel
                                className="modalCheckbox"
                                label="Fake news no pitch (-8)"
                                control={
                                    <Checkbox
                                        name={"fakeNews"}
                                        onChange={t2EventHandler}
                                        checked={t2Events.fakeNews}
                                        icon={<RadioButtonUncheckedRounded/>}
                                        checkedIcon={<RadioButtonCheckedRounded/>}
                                        sx={{
                                            color: '#000',
                                            '&.Mui-checked': {
                                                color: '#FB8500'
                                            }
                                        }}
                                    />
                                }
                                sx={{
                                    color: '#FFF',
                                }}
                            />
                        </Grid>
                    </Grid>
                    {
                        t2Win ? <img className="modalWinner" src={winnerLogo} alt="winner"/> : <div className="spacer"/>
                    }
                </Grid>

            </Grid>

            <Button
                disabled={isClicked}
                className="modalButton"
                onClick={() => {
                    defineWinner()
                }}
            >Submit</Button>

        </Grid>

    );
}