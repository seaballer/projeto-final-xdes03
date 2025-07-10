'use client'
import { useState } from "react";
import GameCard from "@/app/ui/GameCard";
import { GameProps } from "@/app/ui/GameCard";
import axios from 'axios';
import { addGame } from "@/app/lib/action";
import Link from "next/link";
import { Box, Button, CircularProgress, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { ArrowBack, Search, Star } from "@mui/icons-material";
import { useFormStatus } from "react-dom";

/* Forma adequada de gerenciar o estado de um botão dentro de um formulário que usa a prop 'action' para chamar uma Server Action. Necessário para que o usuario não clique várias vezes enquanto o jogo está sendo salvo (adicionado na biblioteca) */
function BotaoSalvar() {
  const { pending } = useFormStatus();

  return (
    <Button
        type="submit"
        variant="contained"
        color="primary"        
    >
        {pending ? 'Salvando...' : 'Adicionar jogo'}
    </Button>
  );
}

export default function CreateGame() {

    const [gameCardState, setGameCardState] = useState<GameProps | null>(null)

    const [isSearching, setIsSearching] = useState(false) //Gerencia o estado do botão de pesquisa, para que o botão de pesquisa não seja clicado varias vezes enquanto faz a busca na API 

    /* Usando  event: React.FormEvent<HTMLFormElement e onSubmit no formulário por ser uma função Client Side*/
    const SearchGame = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault() //Evita que a página inteira recarregue

        setIsSearching(true);

        const formData = new FormData(event.currentTarget)

        const nomeJogo = formData.get('search_name') as string;

        const {data} = await axios.get(`/api/search?query=${encodeURIComponent(nomeJogo)}`);
        const detalhesDoJogo = await axios.get(`/api/details?id=${data.results[0].id}`);

        let newGameCard: GameProps;

        const results = detalhesDoJogo.data;

        if (!nomeJogo || nomeJogo.length === 0) {
            newGameCard = {
                id: 0,
                nome: 'Jogo não encontrado',
                img: 'https://cdn-icons-png.flaticon.com/512/6659/6659895.png',
                descricao: '',
                metacritic: 0
            }
        }
        else {
            newGameCard = {
                id: results.id,
                nome: results.name,
                img: results.background_image,
                descricao: results.description_raw,
                metacritic: results.metacritic,
            }            
        }

        setGameCardState(newGameCard);
        setIsSearching(false);
    }    

    // Função de cliente que serve como 'ponte': prepara os dados e chama a Server Action (addGame)
    const SaveGame = async (formData:FormData) => {
        const comentario = formData.get('comentario') as string
        const avaliacao = Number(formData.get('avaliacao'))

        if (gameCardState && gameCardState.id !== 0) {
            const gameToSave: GameProps = {
                ...gameCardState,
                avaliacao: avaliacao,
                comentario: comentario
            }
            
            await addGame(gameToSave);
        }
    }

    return (
        <Box mt={4}>
            <Box 
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                mb={4}
                py={2}
                borderBottom='1px solid #ccc'
            >
                <Typography variant="h3" fontWeight="bold" mx={4}>
                    Adicionar Jogo
                </Typography>

                <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    component={Link}
                    href="/dashboard"
                >
                    Voltar
                </Button>
            </Box>

            <Box component="form" onSubmit={SearchGame} display="flex" gap={2} m={4}>
                <TextField
                    name="search_name"
                    label="Pesquisar jogo"
                    variant="outlined"
                    sx={{
                        width: "30%",
                    }}
                />
                <IconButton type="submit" color="primary" disabled={isSearching}>
                  {isSearching ? <CircularProgress size={24}/> : <Search />}
                </IconButton>
            </Box>

            {gameCardState && (
                <Box
                    display="flex"
                    justifyContent="center"
                    mb={4}
                >
                    <Box
                    width={{ xs: "100%", sm: "66.66%", md: "50%" }} // equivalente a 12, 8 e 6 colunas do grid de 12 colunas
                    >
                    <   GameCard {...gameCardState} variant="searchResult" />
                    </Box>
                </Box>
            )}

            {gameCardState && gameCardState.id !== 0 && (
                <Box component="form" action={SaveGame} display="flex" flexDirection="column" gap={3} mx={8}>
                    <FormControl>
                        <Typography variant="body1" fontWeight="bold" mb={1}>Minha avaliação:</Typography>
                        <RadioGroup row name="avaliacao">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <FormControlLabel
                                    key={num}
                                    value={num.toString()}
                                    control={<Radio />}
                                    label={
                                        <Box display="flex" alignItems="center" gap={0.5}>
                                            {num}
                                            <Star fontSize="small" color="action" />
                                        </Box>
                                    }
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>

                    <TextField
                        name="comentario"
                        label="Deixe um comentário..."
                        multiline
                        rows={3}
                        fullWidth
                    />

                    <BotaoSalvar />
                </Box>
            )}
        </Box>
    )
}