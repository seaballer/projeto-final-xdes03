'use server'
import DB from "./db";
import { GameProps } from "../ui/GameCard";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const arquivo: string = 'jogos-salvos.json'

export const deleteGame = async (id: number) => {

    const game = await DB.dbLer(arquivo);

    const gameToRemove =  game.findIndex((p) => p.id === id);

    game.splice(gameToRemove,1);

    await DB.dbSalvar(arquivo, game)

    revalidatePath('/dashboard')

    redirect('/dashboard');
}


export const addGame = async (gameToSave: GameProps) => {

    const db = await DB.dbLer(arquivo)

    const jogoJaExiste = db.find((p) => p.id === gameToSave.id)

    if (jogoJaExiste) {
        console.log('Jogo já existe na biblioteca.')
        redirect('/dashboard')
    }
    else {
        delete gameToSave.variant; //Para não poluir o json
        db.push(gameToSave)
        await DB.dbSalvar(arquivo, db)
        revalidatePath('/dashboard')
        redirect('/dashboard')
    }

}

export const editGame = async (id: number, formData: FormData) => {
    const db = await DB.dbLer(arquivo);

    const gameIndex = db.findIndex((p: GameProps) => p.id === id);
    if (gameIndex === -1) return;

    const gameOriginal = db[gameIndex];

    const novaAvaliacao = Number(formData.get("avaliacao"));
    const novoComentario = formData.get("comentario") as string;

    const gameAtualizado: GameProps = {
        ...gameOriginal,
        avaliacao: novaAvaliacao,
        comentario: novoComentario,
    };

    db.splice(gameIndex, 1, gameAtualizado);

    await DB.dbSalvar(arquivo, db);

    revalidatePath('/dashboard');
}
