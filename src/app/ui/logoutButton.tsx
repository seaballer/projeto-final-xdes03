import { logout } from "../lib/action";
import { Box, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";

export default function LogoutButton(){

    return(
        <Box
            component="form"
            action={logout}>
            <Button variant="contained" type="submit" color="info" startIcon={<Logout />}>Logout</Button>
        </Box>
    )  
}