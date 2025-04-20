import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function SignUpPage() {

    const fields: String[] = [
        "Nome", "Ano de Fundação", "Slogan"
    ]

    return (
        <Grid container
              className="signUpPage"
              direction="column"
        >
            <Grid container
                  className="mainContainer"
                  direction="column"
                  spacing={3}
            >
                <p>Cadastrar Startup</p>

                {
                    fields.map((text: String, i) => (
                        <TextField
                            className="textField"
                            label={text}
                            variant="outlined"
                            key={i}
                        />
                    ))}

                <Button variant="contained">Confirm</Button>
            </Grid>
        </Grid>
    );
}