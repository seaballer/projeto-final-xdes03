import Image from "next/image"
import Link from "next/link"
import DB from "../lib/db"
import { redirect } from "next/navigation"

export interface GameProps{
    id: number,
    nome: string,
    img: string,
    descricao: string
}

export default function GameCard(props: GameProps) {

    const db: string = 'jogos-salvos.json'

    const deleteGame = async () => {
        'use server';
        const game = await DB.dbLer(db);

        const gameToRemove =  game.findIndex((p) => p.id === props.id);

        game.splice(gameToRemove,1);

        await DB.dbSalvar(db, game)

        redirect('/dashboard');
    }

    return (
        <div className="">
            <h2>{props.nome}</h2>
            <Image
                src={props.img}
                width={200}
                height={200}
                alt={`Imagem do pokémon ${props.nome}`}
            />
            <p>{props.descricao}</p>
            <div className="">
                <Link href={`/dashboard/edit/${props.id}`} id="btn-edit">Editar</Link>
                <form action={deleteGame}>
                    <button id="btn-delete">Deletar</button>
                </form>
            </div>
        </div>
    )
}