'use server'
import DB from "./db";
import { GameProps } from "../ui/GameCard";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { obterSessaoSeValida } from "./session";

const arquivo: string = 'jogos-salvos.json'

export const deleteGame = async (id: number) => {

    const sessao = await obterSessaoSeValida()

    if (!sessao) {
        throw new Error("Ação não autorizada. O usuário precisa estar logado.")
    }

    const game = await DB.dbLer(arquivo);

    const gameToRemove =  game.findIndex((game: GameProps) => game.id === id && game.userId === sessao.userId);

    game.splice(gameToRemove,1);

    await DB.dbSalvar(arquivo, game)

    revalidatePath('/dashboard')

    redirect('/dashboard');
}


export const addGame = async (gameToSave: GameProps) => {

    const sessao = await obterSessaoSeValida()

    if (!sessao) {
        throw new Error("Ação não autorizada. O usuário precisa estar logado.")
    }

    const db = await DB.dbLer(arquivo)

    const jogoJaExiste = db.find((game) => game.id === gameToSave.id && game.userId === sessao.userId)

    if (jogoJaExiste) {
        console.log('Jogo já existe na biblioteca.')
        redirect('/dashboard')
    }
    else {
        delete gameToSave.variant; //Para não poluir o json
        const novoJogo: GameProps = {
            ...gameToSave,
            userId: sessao.userId as string
        }
        db.push(novoJogo)
        await DB.dbSalvar(arquivo, db)
        revalidatePath('/dashboard')
        redirect('/dashboard')
    }

}
