import Link from "next/link";
import DB from "../lib/db";
import GameCard, { GameProps } from "../ui/GameCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { obterSessaoSeValida } from "../lib/session";
import { redirect } from "next/navigation";
import FilteredGameList from "../ui/FilteredGameList";

const db : string = 'jogos-salvos.json';

export default async function DisplayGames() {

    const sessao = await obterSessaoSeValida()

    if (!sessao) {
        redirect('/auth/login')
    }

    const jogos: GameProps[] = await DB.dbLer(db);

    const jogosDoUsuario: GameProps[] = jogos.filter((jogo) => jogo.userId === sessao.userId)

    return (
        <Box
            mt={4}
        >
            <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                mb={8}
                py={2}
                borderBottom='1px solid #ccc'
            >
                <Typography variant="h3" fontWeight="bold" mx={4}>
                    Meus Jogos
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={'/dashboard/create'}
                    startIcon={<Add />}
                    sx={{ml: 3}}
                >
                    Adicionar jogo
                </Button>
            </Box>

            <FilteredGameList jogosDoUsuario={jogosDoUsuario}/>
        </Box>
    )
}