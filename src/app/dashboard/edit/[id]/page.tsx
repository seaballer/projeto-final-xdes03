import { GameProps } from "@/app/ui/GameCard";
import DB from "@/app/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";

const arquivo = 'jogos-salvos.json'

interface EditGameProps {
    params: { id: string }
}

export default async function EditGame({params} : EditGameProps) {
    const id = parseInt(params.id, 10);
    
    const gameDB = await DB.dbLer(arquivo);

    const gameToEdit: GameProps = gameDB.find((p: GameProps) => p.id === id);
    const gameToEditIndex: number = gameDB.findIndex((p) => p.id === id);

    const atualizarGame = async (dadosDoJogo: GameProps, formData : FormData) => {
        'use server';

        const novaAvaliacao = Number(formData.get('Avaliacao'))

        const updatedGame: GameProps = {
            id: dadosDoJogo.id,
            nome: dadosDoJogo.nome,
            img: dadosDoJogo.img,
            descricao: dadosDoJogo.descricao,
            avaliacao: novaAvaliacao
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
            <p className="">{gameToEdit.descricao}</p>
            <form action={atualizarGame.bind(null, gameToEdit)} className="">
                <section className="">
                    <legend>Fomento</legend>
                    <label htmlFor="Avaliacao">Avaliação</label>
                    <select name="Avaliacao" id="Avaliacao" defaultValue={gameToEdit.avaliacao}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>                    
                </section>
                <button>Atualizar</button>
            </form>
        </div>
    )
}