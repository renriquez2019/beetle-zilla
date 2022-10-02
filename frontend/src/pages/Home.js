import {Box, Button, Paper } from "@mui/material";
import Title from "../components/Title";

// simple home page to for login/register access
export default function Home() {

    return (
        <div className="home">
            <Box
                component={Paper}
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: '5px',
                    backgroundColor: 'white',
                    height: '20rem',
                    width:  '40rem',
                    border: 'medium solid black'
                }}
            >
                <Title
                    variant= "h2"
                />

                <div className="home-row">
                    <Button
                        variant="outlined"
                        size="large"
                        href="/login"
                        sx = {{
                            width: '12rem',
                            textDecoration: 'none'
                        }}>
                        Sign In
                    </Button>
                
                    <Button
                        variant="contained"
                        size="large"
                        href="/register"
                        sx = {{
                            width: '12rem',
                            textDecoration: 'none'
                        }}>
                        Sign Up
                    </Button> 
                </div>
            
                <div className="home-row">
                    <Button
                        variant="contained"
                        size="large"
                        sx = {{
                            width: '25rem'
                        }}>
                        Sign in as Demo User
                    </Button>
                </div>
            </Box>
        </div>
    );
};