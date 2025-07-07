import Link from "next/link"
import { obterSessaoSeValida } from "../lib/session";
import LogoutButton from "./logoutButton";
import UserInfo from "./userInfo";
import { AppBar, Box, Toolbar, Typography, Link as MuiLink } from "@mui/material";

export default async function Header() {

    const isLogged = await obterSessaoSeValida();
    let userEmail: string = "";
    if(isLogged)
    {
        userEmail = isLogged?.userEmail as string;
    }

    return (
        <AppBar position="static" color="primary" component="header">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                    <Typography variant="h6">
                        <MuiLink href="https://rawg.io/apidocs" target="_blank" rel="noopener" sx={{ color:"white" }}>
                            RAWG API
                        </MuiLink>
                    </Typography>
                </Box>

                <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                    <Typography variant="h3" component="div" fontWeight={"bold"}>
                        MyGameList
                    </Typography>
                </Box>

                {isLogged && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <UserInfo userEmail={userEmail} />
                        <LogoutButton />
                    </Box>
                )}
        </Toolbar>
        </AppBar>
    )
}