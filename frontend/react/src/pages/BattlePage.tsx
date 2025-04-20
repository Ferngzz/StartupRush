import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {BattleCard} from '../components/BattleCard.tsx'
import {Team} from "../interfaces/Team.ts"
import {Duel} from "../interfaces/Duel.ts"
import {Header} from "../components/Header.tsx";


export function BattlePage() {

    let teams: Team[] = [
        {
            name: "Equipe 1",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 2",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 3",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 4",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 5",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 6",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 7",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        },
        {
            name: "Equipe 8",
            logo: "frontend/react/src/assets/team_logo_placeholder.svg"
        }
    ]

    const duels: Duel[] = []

    /*
    * Enquanto ainda tiver times no array
    * cria duelos entre equipes aleatórias e então
    * remove as equipes já sorteadas do array de equipes
    */
    for (let i = 0; teams.length > 0; i++) {

        let index1 = Math.floor(Math.random() * teams.length)
        let team1: Team = teams[index1];
        teams.splice(index1, 1);

        let index2 = Math.floor(Math.random() * teams.length)
        let team2: Team = teams[index2];
        teams.splice(index2, 1);


        let duel: Duel = {
            team1: team1,
            team2: team2
        }

        duels.push(duel);
    }


    return (
        <Grid container
              className="battlePage"
        >
            <Header/>
            <Grid container
                  className="battlePageMainContainer"
                  direction={"column"}
                  spacing={2}
            >
                <p className={"battlePageTitle"}>Batalhas</p>

                <Grid container
                      className="battleContainer"
                >
                    <Grid container
                          wrap="nowrap"
                          direction="column"
                          className="battleCardsContainer"
                          sx={{
                              maxWidth: 1200,
                              maxHeight: 600,
                              pr: 2,
                              pl: 2,
                              overflowY: 'auto'
                          }}
                    >
                        {
                            duels.map(
                                (d: Duel, i: number) => {
                                    return (
                                        <Grid key={i}>
                                            <BattleCard teams={[d.team1, d.team2]}/>
                                        </Grid>
                                    )
                                })
                        }
                    </Grid>
                </Grid>

                <Button variant="contained"
                        onClick={() => {

                        }}
                >Próxima Fase</Button>
            </Grid>
        </Grid>
    );
}