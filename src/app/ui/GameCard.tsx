"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Collapse, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteButton from "./DeleteButton";

export interface GameProps{
    id: number,
    nome: string,
    img: string,
    descricao: string,
    comentario?: string,
    variant?: 'dashboard' | 'searchResult';
}

export default function GameCard(props: GameProps) {
    // state pra clicável
    const [expandido, setExpandido] = useState(false);

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
                <Typography variant="h6" gutterBottom>
                    {props.nome}
                </Typography>
                <Collapse in={expandido} timeout={"auto"} unmountOnExit>
                    <Box mt={2}>
                        <Typography variant="body2">
                            {props.descricao}
                        </Typography>
                        {props.comentario && (
                            <>
                                <Typography variant="subtitle2" mt={1}>
                                    Comentários:
                                </Typography>
                                <Typography variant="body2">
                                    {props.comentario}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Collapse>
            </CardContent>
        </CardActionArea>

        {props.variant === "dashboard" && (
            <CardActions>
                <Button 
                size="small" 
                variant="outlined" 
                color="primary"
                startIcon={<Edit />} 
                component={Link} 
                href={`/dashboard/edit/${props.id}`}
                >
                    Editar
                </Button>

                <DeleteButton id={props.id} />
            </CardActions>
        )}
    </Card>
    

    )

    // return (
    //     <div className="">
    //         <h2>{props.nome}</h2>
    //         <Image
    //             src={props.img}
    //             width={200}
    //             height={200}
    //             alt={`Imagem do pokémon ${props.nome}`}
    //         />
    //         <p>{props.descricao}</p>
    //         {props.comentario && (
    //             <div>
    //                 <p>Comentário do usuário:</p>
    //                 <p>{props.comentario}</p>
    //             </div>
    //         )}
    //         {props.variant === 'dashboard' && (
    //             <div className="">
    //                 <Link href={`/dashboard/edit/${props.id}`} id="btn-edit">Editar</Link>
    //                 <form action={deleteGame.bind(null, props.id)}>
    //                     <button id="btn-delete">Deletar</button>
    //                 </form>
    //             </div>
    //         )}
    //     </div>
    // )
}