import { GameProps } from "@/app/ui/GameCard";
import DB from "@/app/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";

const arquivo = 'jogos-salvos.json'

interface EditGameProps {
    params: { id: string }
}

export default async function EditGame({params} : EditGameProps) {

    const resolvedParams = await params;

    const id = parseInt(resolvedParams.id, 10);
    
    const gameDB = await DB.dbLer(arquivo);

    const gameToEdit: GameProps = gameDB.find((p: GameProps) => p.id === id);
    const gameToEditIndex: number = gameDB.findIndex((p) => p.id === id);

    const atualizarGame = async (dadosDoJogo: GameProps, formData : FormData) => {
        'use server';

        const novoComentario = formData.get('comentario') as string

        const updatedGame: GameProps = {
            id: dadosDoJogo.id,
            nome: dadosDoJogo.nome,
            img: dadosDoJogo.img,
            descricao: dadosDoJogo.descricao,
            comentario: novoComentario
        }

        gameDB.splice(gameToEditIndex,1,updatedGame);

        await DB.dbSalvar(arquivo, gameDB);

        redirect('/dashboard');

    }

    return (
        <div>
            <h2>{gameToEdit.nome}</h2>
            <Image src={gameToEdit.img}
                alt=""
                width={100}
                height={100}
                style={{margin: "0 auto"}}
            /> 
            <p>{gameToEdit.descricao}</p>
            <p>{gameToEdit.comentario}</p>
            <form action={atualizarGame.bind(null, gameToEdit)} className="">
                <section>
                    <input type="text"
                    id="comentario"
                    name="comentario" 
                    placeholder="Comentário do usuário"
                    defaultValue={gameToEdit.comentario}
                    />
                </section>
                <button>Atualizar</button>
            </form>
        </div>
    )
}