"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Edit, Star } from "@mui/icons-material";
import DeleteButton from "./DeleteButton";
import { editGame } from "../lib/action";

export interface GameProps{
    id: number,
    nome: string,
    img: string,
    descricao: string,
    metacritic: number,
    avaliacao?: number,
    comentario?: string,
    variant?: 'dashboard' | 'searchResult'
}

export default function GameCard(props: GameProps) {
    // state pra clicável
    const [expandido, setExpandido] = useState(false);

    // Novo estado:
    const [openEdit, setOpenEdit] = useState(false);
    const [avaliacao, setAvaliacao] = useState(props.avaliacao ?? 0);
    const [comentario, setComentario] = useState(props.comentario ?? "");


    return (
    <Card sx={{ maxWidth: 345, mx: "auto" }}>
        <CardActionArea onClick={() => setExpandido(!expandido)}>
            <CardMedia>
                <Image
                    src={props.img}
                    width={345}
                    height={200}
                    alt={`Imagem do jogo ${props.nome}`}
                    style={{
                        objectFit: "cover",
                    }}
                />
            </CardMedia>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom>
                        {props.nome}
                    </Typography>
                    {props.avaliacao && (
                            <>
                                <Box display="flex" alignItems="center">
                                <Typography variant="h6">
                                        {props.avaliacao}
                                </Typography>
                                        <Star />
                                    </Box>
                            </>
                        )}
                </Box>

                <Collapse in={expandido} timeout={"auto"} unmountOnExit>
                    <Box mt={2}>
                        <Typography variant="subtitle2" my={1}>Descrição:</Typography>
                        <Typography variant="body2">
                            {props.descricao}
                        </Typography>
                        <Typography variant="subtitle2" my={1}>Avaliação do Metacritic: {props.metacritic ? `${props.metacritic}/100` : "Sem avaliação"}</Typography>
                        
                        {props.comentario && (
                            <>
                                <Typography variant="subtitle2" my={1}>
                                    Comentários:
                                </Typography>
                                <Typography variant="body2" color="inherit">
                                    {props.comentario}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Collapse>
            </CardContent>
        </CardActionArea>

        {props.variant === "dashboard" && (
            <Box display="flex" justifyContent="space-around" alignItems="center">
                <CardActions>
                    <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => setOpenEdit(true)}
                    >
                        Editar
                    </Button>

                    <DeleteButton id={props.id} />
                </CardActions>
            </Box>
        )}

    <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>Editar Avaliação</DialogTitle>
        <DialogContent>
            
                <FormControl margin="normal">
                    <FormLabel>Avaliação</FormLabel>
                    <RadioGroup
                        row
                        name="avaliacao"
                        value={avaliacao.toString()}
                        onChange={(e) => setAvaliacao(parseInt(e.target.value))}
                        sx={{justifyContent: 'center'}}
                    >
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
            label="Comentário"
            multiline
            fullWidth
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            margin="normal"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenEdit(false)} color="error">
            Cancelar
            </Button>
            <Button
            variant="contained"
            color="primary"
            onClick={async () => {
                const formData = new FormData();
                formData.set("avaliacao", avaliacao.toString());
                formData.set("comentario", comentario);

                await editGame(props.id, formData);
                setOpenEdit(false);
            }}
            >
            Salvar
            </Button>
        </DialogActions>
    </Dialog>
    </Card>
    )
}