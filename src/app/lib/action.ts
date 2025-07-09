'use server'
import DB from "./db";
import { GameProps } from "../ui/GameCard";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { obterSessaoSeValida, deletarCookieSessao } from "./session";

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


export const editGame = async (dadosDoJogo: GameProps, formData : FormData) => {
    'use server';

    const sessao = await obterSessaoSeValida()

    if(!sessao) {
        throw new Error("Ação não autorizada. O usuário precisa estar logado.")
    }

    const db = await DB.dbLer(arquivo) //Buscando o banco de dados mais recente antes de fazer o update

    const gameToEditIndex: number = db.findIndex((game: GameProps) => game.id === dadosDoJogo.id && game.userId === sessao.userId) //Buscando o índice correto no banco de dados mais recente

    /* Se o indice do jogo for encontrado (gameToEditIndex > -1) faz o update */
    if (gameToEditIndex > -1) {

        const novoComentario = formData.get('comentario') as string
        const novaAvaliacao = Number(formData.get('avaliacao'))

        const updatedGame: GameProps = {
            ...dadosDoJogo,
            avaliacao: novaAvaliacao,
            comentario: novoComentario,
            userId: sessao.userId as string
        }

        db.splice(gameToEditIndex,1,updatedGame);

        await DB.dbSalvar(arquivo, db);

        revalidatePath('/dashboard')
        revalidatePath(`/dashboard/edit/${dadosDoJogo.id}`)
    }

    redirect('/dashboard');

}

// Ação para fazer o logout do usuário
export async function logout() {

  await deletarCookieSessao();
  redirect('/auth/login'); // Redireciona para a página de login
  
}