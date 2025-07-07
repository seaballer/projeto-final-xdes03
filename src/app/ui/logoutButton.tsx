import { redirect } from "next/navigation";
import { deletarCookieSessao } from "../lib/session"
import { Box, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";

export default function LogoutButton(){

    const logout = async () => {
        'use server';
        await deletarCookieSessao();
        redirect('/login');
    }

    return(
        <Box
            component="form"
            action={logout}>
            <Button variant="contained" type="submit" color="info" startIcon={<Logout />}>Logout</Button>
        </Box>
    )  
}