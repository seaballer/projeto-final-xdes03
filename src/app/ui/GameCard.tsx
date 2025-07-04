import Image from "next/image"
import Link from "next/link"
import { deleteGame } from "../lib/action"

export interface GameProps{
    id: number,
    nome: string,
    img: string,
    descricao: string
}

export default function GameCard(props: GameProps) {

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
                <form action={deleteGame.bind(null, props.id)}>
                    <button id="btn-delete">Deletar</button>
                </form>
            </div>
        </div>
    )
}