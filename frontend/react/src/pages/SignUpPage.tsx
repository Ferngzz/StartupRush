import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Header} from "../components/Header.tsx";
import {useRef} from "react";
import {Startup} from "../interfaces/Startup.ts"
import {useNavigate} from "react-router-dom";

export function SignUpPage() {
    const nameRef = useRef<HTMLInputElement>(null);
    const sloganRef = useRef<HTMLInputElement>(null);
    const foundingYearRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    /**
     * Função auxiliar para requisição GET,
     * devolve todas startups cadastradas.
     */
    const checkStartupQuantity = async () => {
        const res = await fetch("/startup", {
            method: "GET",
        })
        const data = await res.json()
        console.log(data)
        return data.data
    }

    /**
     * Verifica se a quantidade de startups criada é suficiente para iniciar
     * o torneio.
     * Quantidade deve ser >= 4 e par
     */
    const startBattlePhase = async () => {
        const res = await checkStartupQuantity()

        if (res.length >= 4 && res.length % 2 === 0) {
            navigate("/BattlePage")
        }
    }

    /**
     * Função auxiliar para requisição POST,
     * cria uma nova Startup no banco em fluxo normal.
     */
    const createStartup = async () => {
        try {
            // Converte o valor no TextField de FoundingYear para number
            const foundingYear = foundingYearRef.current?.value
                ? parseInt(foundingYearRef.current.value, 10) : 0;


            // Criação do objeto de Startup
            const startup: Startup = {
                name: nameRef.current?.value ?? "",
                slogan: sloganRef.current?.value ?? "",
                founding_year: foundingYear,
            }

            // Converte em JSON para enviar pro backend
            const toSend = JSON.stringify(startup)


            // Requisição de POST para a Startup criada anteriormente
            const res = await fetch("/startup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: toSend
            })

            // Verificações para campos vazios,
            // Pode resultar em erro caso já exista startup com o nome informado
            // visto que o nome está definido como @unique no prisma
            if (!res.ok && nameRef.current?.value == "") {
                console.log("Enter Startup name")
            } else if (!res.ok && sloganRef.current?.value == "") {
                console.log("Enter Startup slogan")
            } else if (!res.ok && foundingYearRef.current?.value == "") {
                console.log("Enter Startup founding year")
            } else if (!res.ok) {
                console.log("There's already a startup with the informed name")
            } else {
                console.log("Start creating start up")
            }

            // Verifica quantas startups já estão criadas
            const startupQuantity = await checkStartupQuantity()

            // Se foi criada a oitava startup vai automaticamente para
            // a BattlePage
            if (startupQuantity.length == 8) {
                console.log("full tournament")
                navigate("/battlePage")
            }

        } catch (e: any) {
            if (e.response?.status === 500) {
                console.log("Error creating startup")
            }
        }
    }


    return (
        <Grid container
              className="signUpPage"
              direction="column"
        >
            <Header/>
            <Grid container
                  className="mainContainer"
                  direction="column"
                  spacing={3}
            >
                <p>Cadastrar Startups</p>

                <TextField
                    className="textField"
                    label="Name"
                    variant="outlined"
                    inputRef={nameRef}
                />

                <TextField
                    className="textField"
                    label="Slogan"
                    variant="outlined"
                    inputRef={sloganRef}
                />

                <TextField
                    type="number"
                    className="textField"
                    label="Founding Year"
                    variant="outlined"
                    inputRef={foundingYearRef}
                />

                <Grid container>
                    <Button variant="contained"
                            onClick={() => {
                                createStartup()
                            }}
                    >Sign</Button>

                    <Button variant="contained"
                            onClick={() => {
                                startBattlePhase()
                            }}
                    >Next Phase</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}