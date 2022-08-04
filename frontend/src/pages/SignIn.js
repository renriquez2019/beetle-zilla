import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline  from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    return (
       <ThemeProvider theme = {theme}>
            <Container component ="main" maxWidth ="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 25,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">
                        Sign In
                    </Typography>

                    <Box component="form" sx={{mt: 3}}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant ="outlined"
                                    type = "email"
                                    id ="email"
                                    name ="email"
                                    label="Enter your email:"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    variant ="outlined"
                                    type ="password"
                                    id ="password"
                                    name="password"
                                    label="Enter your password:"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Login 
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
       </ThemeProvider>       
    );
}