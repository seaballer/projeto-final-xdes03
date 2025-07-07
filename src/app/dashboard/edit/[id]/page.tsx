import { GameProps } from "@/app/ui/GameCard";
import DB from "@/app/lib/db";
import Image from "next/image";
import Link from "next/link";
import { obterSessaoSeValida } from "@/app/lib/session";
import { updateGame } from "@/app/lib/action";

const arquivo = 'jogos-salvos.json'

interface EditGameProps {
    params: { id: string }
}

export default async function EditGame({params} : EditGameProps) {

    const sessao = await obterSessaoSeValida()

    if (!sessao) {
        throw new Error("Ação não autorizada. O usuário precisa estar logado.")
    }

    const resolvedParams = await params;

    const id = parseInt(resolvedParams.id, 10);
    
    const gameDB = await DB.dbLer(arquivo);

    const gameToEditIndex: number = gameDB.findIndex((game) => game.id === id && game.userId === sessao.userId);

    /* Caso o índice do jogo não for encontrado (gameToEditIndex === -1) */
    if (gameToEditIndex === -1) {
        return (
            <div>
                <h2>Jogo não encontrado</h2>
                <p>Este jogo não existe na sua biblioteca ou você não tem permissão para editá-lo.</p>
                <Link href="/dashboard">Voltar para o Dashboard</Link>
            </div>
        );
    }

    const gameToEdit: GameProps = gameDB[gameToEditIndex];

    return (
        <div>
            <Link href="/dashboard">Voltar</Link>
            <h2>{gameToEdit.nome}</h2>
            <Image src={gameToEdit.img}
                alt=""
                width={100}
                height={100}
                style={{margin: "0 auto"}}
            />
            <p>Descrição: </p> 
            <p>{gameToEdit.descricao}</p>
            <p>Comentário:</p>
            <p>{gameToEdit.comentario}</p>
            <form action={updateGame.bind(null, gameToEdit)} className="">
                <p>Minha avaliação:</p>
                <fieldset>
                    {/* A ordem é invertida (de 5 para 1) para facilitar o CSS (acender as estrelas) */}
                    <input type="radio" id="estrela5" name="avaliacao" value="5" defaultChecked={gameToEdit.avaliacao === 5}/>
                    <label htmlFor="estrela5">★</label>
                    
                    <input type="radio" id="estrela4" name="avaliacao" value="4" defaultChecked={gameToEdit.avaliacao === 4}/>
                    <label htmlFor="estrela4">★</label>
                    
                    <input type="radio" id="estrela3" name="avaliacao" value="3" defaultChecked={gameToEdit.avaliacao === 3}/>
                    <label htmlFor="estrela3">★</label>
                    
                    <input type="radio" id="estrela2" name="avaliacao" value="2" defaultChecked={gameToEdit.avaliacao === 2}/>
                    <label htmlFor="estrela2">★</label>
                    
                    <input type="radio" id="estrela1" name="avaliacao" value="1" defaultChecked={gameToEdit.avaliacao === 1}/>
                    <label htmlFor="estrela1">★</label>
                </fieldset>                
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