import {Header} from "../components/Header.tsx";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function SignUpPage() {

    const fields: String[] = [
        "Name", "Slogan", "Foundation Year"
    ]

    return (
        <Grid container
              direction="column"
              spacing={32}
              sx={{
                  justifyContent: "center",
                  alignItems: "center",
              }}
        >
            <Grid size={12}>
                <Header/>
            </Grid>
            <Grid container
                  className="mainContainer"
                  direction="column"
                  spacing={6}
                  sx={{
                      width: "50%",
                  }}
            >
                <p>Sign Up</p>

                {
                    fields.map((text: String) => (
                        <TextField
                            className="textField"
                            label={text}
                            variant="outlined"
                            color="error"
                        />
                ))}

                <Button variant="contained">Confirm</Button>
            </Grid>
        </Grid>
    );
}