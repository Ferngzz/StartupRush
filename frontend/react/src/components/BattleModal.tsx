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
        attractive: false,
        investor: false,
        fakeNews: false
    })

    const [t2Events, setT2Events] = useState<Event>({
        pitch: false,
        bug: false,
        attractive: false,
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
            } else if (name === "attractive") {
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
            } else if (name === "attractive") {
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
            winner(team1);
        } else if (t2Score > t1Score) {
            sett2Win(true);
            setExistsWinner(true);
            winner(team2);
        } else {
            const random = Math.floor(Math.random() * 2);
            console.log(random)
            if (random == 1) {
                sett1Win(true)
                setExistsWinner(true)
                setT1Score(prevState =>
                    (prevState + 2));
                winner(team1);
            } else {
                sett2Win(true);
                setExistsWinner(true);
                setT2Score(prevState =>
                    (prevState + 2));
                winner(team2);
            }
        }
        setIsClicked(true);
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
                                        name={"attractive"}
                                        onChange={t1EventHandler}
                                        checked={t1Events.attractive}
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
                                        name={"attractive"}
                                        onChange={t2EventHandler}
                                        checked={t2Events.attractive}
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
                    onClose()
                }}
            >Send</Button>

        </Grid>

    );
}