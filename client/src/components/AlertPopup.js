import { Alert, Stack } from "@mui/material";

export const AlertPopup = ({content}) => {

    return (
        <Stack sx = {{width: "100%", alignText: "center" }} spacing = {1}>
            {content.error ? 
            <Alert severity = "error" variant="filled"  >{content.message}</Alert>
            :
            <Alert severity = "success" variant="filled"  >{content.message}</Alert>
            }
        </Stack>
    
    );
}

export default AlertPopup