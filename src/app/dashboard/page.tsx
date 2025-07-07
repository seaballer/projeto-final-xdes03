import Link from "next/link";
import DB from "../lib/db";
import GameCard, { GameProps } from "../ui/GameCard";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const db : string = 'jogos-salvos.json';

export default async function DisplayGames() {

    const dados: GameProps[] = await DB.dbLer(db);

    return (
        <Box
            mt={8}
        >
            
            <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                mb={4}
            >
                <Typography variant="h3" fontWeight="bold">
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

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {dados.map((game) =>(
                    <Grid key={game.id} size={{ xs: 2, sm: 4, md: 4 }}>
                        <GameCard {...game} key={game.id} variant="dashboard"/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}