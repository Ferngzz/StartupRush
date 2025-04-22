import Grid from "@mui/material/Grid";
import {BattleCard} from '../components/BattleCard.tsx'
import {Team} from "../interfaces/Team.ts"
import {Duel} from "../interfaces/Duel.ts"
import {Header} from "../components/Header.tsx";
import {useState, useEffect, useRef} from "react";
import {Modal} from "@mui/material";
import {BattleModal} from "../components/BattleModal.tsx";
import {useNavigate} from "react-router-dom";


export function BattlePage() {
    const [duels, setDuels] = useState<Duel[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [round, setRound] = useState(1);
    const [finishRound, setFinishRound] = useState(false);
    const newTeamsRef = useRef<Team[]>([]);
    const [champion, setChampion] = useState<Team>();
    const navigate = useNavigate();

    // Função para setar a fase de batalha
    async function setDuelPhase() {
        const response = await fetch("/startup", {method: "GET"});
        const data = await response.json();

        let teams: Team[];


        // Na primeira rodada pega todos os times do banco
        // Nas rodadas seguintes adapta conforme vão sendo
        // avaliados os duelos
        if (round === 1) {
            teams = Object.values(data.data);
        } else {
            teams = [...newTeamsRef.current];
            newTeamsRef.current = [];
        }

        const duelsTemp: Duel[] = [];

        // Randomiza os duelos
        while (teams.length > 1) {
            // Se existem times no array e a quantidade é par faz a criação "aleatória"
            // dos duelos
            if (teams.length % 2 === 0) {
                const index1 = Math.floor(Math.random() * teams.length);
                const team1 = teams.splice(index1, 1)[0];

                const index2 = Math.floor(Math.random() * teams.length);
                const team2 = teams.splice(index2, 1)[0];

                duelsTemp.push({team1, team2});
            } else {

                // Para o caso em que 6 time entram no campeonato
                // Na segunda rodada sobrariam apenas 3, então
                // seleciona os dois com maior pontuação

                let temporaryTeams: Team[] = teams
                temporaryTeams.sort((a, b) => b.score - a.score);

                const team1 = temporaryTeams[0];
                const team2 = temporaryTeams[1];

                teams.splice(teams.indexOf(team1),1);
                teams.splice(teams.indexOf(team2),1);

                duelsTemp.push({team1, team2});
            }
        }

        setDuels(duelsTemp);
        setLoaded(true);
    }

    // Refaz a UI quando termina a rodada
    useEffect(() => {
        if (finishRound) {
            setDuelPhase();
            setFinishRound(false);
        } else if (round === 1) {
            setDuelPhase()
        }
    }, [finishRound]);

    // Depois de terminar a análise de um duelo, tira ele da lista e registra o vencedor
    const handleDuels = (winner: Team) => {
        const newDuels: Duel[] = [...duels];
        newTeamsRef.current.push(winner);

        // Remove o duelo analisado da lista de duelos
        if (typeof activeIndex === 'number') {
            newDuels.splice(activeIndex, 1);
        }

        let teamQuantity = newTeamsRef
        console.log("Team quantity: " + teamQuantity.current.length);

        // Se teamQuantity for 1 e não tiver nenhum duelo restante
        // significa que o vencedor é o último time
        if (teamQuantity.current.length === 1 && newDuels.length == 0) {






            setChampion(teamQuantity.current[0]);
            navigate("/ChampionPage")
        } else {
            setDuels(newDuels);
            console.log("duels: " + newDuels.length);
        }

        console.log("Duelos restantes: " + newDuels.length);



        // Verifica se todos duelos já foram analisados
        if (newDuels.length == 0) {
            console.log("entrei round")

            setRound(prevState => prevState + 1);
            setFinishRound(true);
        }



    }

    return (
        <Grid container className="battlePage">
            <Header/>
            <Grid container
                  className="battlePageMainContainer"
                  direction={"column"}
                  spacing={2}
            >
                {
                    duels.length == 1
                        ? <p className={"battlePageTitle"}>Tournament Final</p>
                        : <p className={"battlePageTitle"}>Battle Phase {round}</p>
                }

                <Grid container className="battleContainer">
                    <Grid container
                          wrap="nowrap"
                          direction="column"
                          className="battleCardsContainer"
                          sx={{
                              maxWidth: 1200,
                              maxHeight: 600,
                              padding: 4,
                              overflowY: 'auto'
                          }}
                    >
                        {loaded &&
                            duels.map((d: Duel, i: number) => (
                                <Grid key={i}
                                      onClick={() => {
                                          setActiveIndex(i)
                                          setOpen(true)
                                      }}>
                                    <BattleCard teams={[d.team1, d.team2]}/>
                                </Grid>
                            ))
                        }

                        <Modal className="battlePageModal"
                               open={open} onClose={() => {
                            setActiveIndex(null)
                            setOpen(false)
                        }}>
                            {
                                activeIndex != null ?
                                    <BattleModal duel={duels[activeIndex]} winner={handleDuels} onClose={() => {
                                        setOpen(false)
                                    }}/> : <div/>
                            }
                        </Modal>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
