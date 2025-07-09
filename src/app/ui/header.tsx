'use client'
import LogoutButton from "./logoutButton";
import UserInfo from "./userInfo";
import { AppBar, Box, Toolbar, Typography, Link as MuiLink } from "@mui/material";
import { JWTPayload } from "jose";

export default function Header({ sessao }: { sessao: JWTPayload | null }) {

    let userEmail: string = "";

    if(sessao) {
        userEmail = sessao.userEmail as string;
    }

    return (
        <div>
            <AppBar position="static" color="primary" component="header">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1, my: 2 }}>
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

                    {sessao && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <UserInfo userEmail={userEmail} />
                            <LogoutButton />
                        </Box>
                    )}
            </Toolbar>
            </AppBar>
        </div>
    )
}