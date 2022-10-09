import logo from '../img/bug.png'
import {Container, Typography} from '@mui/material';

export default function Title({variant}) {

    return (
        <Container 
            component= "div"
            maxWidth = "false"
            sx = {{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            }}
        >
            <img src= {logo} className="title-logo"></img>
            <Typography
                className= "title-text"
                variant = {variant}
            >
                BeetleZilla
            </Typography>
        </Container>
    );
}