"use client";

import { useState } from "react";
import GameCard, { GameProps } from "./GameCard";
import { Grid, TextField, Box, Typography } from "@mui/material";

interface FilteredListProps {
  jogosDoUsuario: GameProps[];
}

export default function FilteredGameList({ jogosDoUsuario }: FilteredListProps) {
    const [termoBusca, setTermoBusca] = useState('');

    const jogosFiltrados = jogosDoUsuario.filter((game) => 
        game.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );

    return (
        <Box mt={4}>
            <Box display="flex" gap={2} m={4}>
                <TextField
                    label="Buscar na minha biblioteca..."
                    variant="outlined"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    sx={{
                        width: "30%",
                        mt: -4
                    }}
                />
            </Box> 
            
            {
                // 1. Primeiro, checamos se a lista ORIGINAL está vazia
                jogosDoUsuario.length === 0 ? 
                (
                    <Typography variant="h4" fontWeight="bold" mx={4} sx={{textAlign: 'center'}}>
                        Sua biblioteca está vazia. Adicione um novo jogo!
                    </Typography>
                ) :
                // 2. Se ele tem jogos, checamos se o filtro encontrou algum resultado
                jogosFiltrados.length > 0 ? 
                (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {jogosFiltrados.map((game) =>(
                            <Grid key={game.id} size={{ xs: 2, sm: 4, md: 4 }}>
                                <GameCard {...game} key={game.id} variant="dashboard"/>
                            </Grid>
                        ))}
                    </Grid>
                ) : 
                // 3. Se ele tem jogos, mas o filtro não encontrou nada, mostramos esta mensagem
                (
                    <Typography variant="h4" fontWeight="bold" mx={4} sx={{textAlign: 'center'}}>
                        Nenhum jogo encontrado na sua biblioteca com o termo "{termoBusca}".
                    </Typography>
                )
            }
        </Box>
    );
}