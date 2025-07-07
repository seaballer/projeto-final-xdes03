'use client'
import Image from "next/image";
import { useState } from "react";
import GameCard from "@/app/ui/GameCard";
import { GameProps } from "@/app/ui/GameCard";
import axios from 'axios';
import { addGame } from "@/app/lib/action";
import Link from "next/link";
import { useFormStatus } from "react-dom";


/* Forma adequada de gerenciar o estado de um botão dentro de um formulário que usa a prop 'action' para chamar uma Server Action. Necessário para que o usuario não clique várias vezes enquanto o jogo está sendo salvo (adicionado na biblioteca) */
function BotaoSalvar() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Salvando...' : 'Adicionar jogo'}
    </button>
  );
}

export default function CreateGame() {

    const [gameCardState, setGameCardState] = useState<GameProps | null>(null)

    const [isSearching, setIsSearching] = useState(false) //Gerencia o estado do botão de pesquisa, para que o botão de pesquisa não seja clicado varias vezes enquanto faz a busca na API 

    /* Usando  event: React.FormEvent<HTMLFormElement e onSubmit no formulário por ser uma função Client Side*/
    const SearchGame = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault() //Evita que a página inteira recarregue

        setIsSearching(true)

        const formData = new FormData(event.currentTarget)

        const nomeJogo = formData.get('search_name') as string

        const {data} = await axios.get(`/api/search?query=${encodeURIComponent(nomeJogo)}`)
        const detalhesDoJogo = await axios.get(`/api/details?id=${data.results[0].id}`)

        let newGameCard: GameProps

        const results = detalhesDoJogo.data

        if (!nomeJogo || nomeJogo.length === 0) {
            newGameCard = {
                id: 0,
                nome: 'Jogo não encontrado',
                img: 'https://cdn-icons-png.flaticon.com/512/6659/6659895.png',
                descricao: '',
                metacritic: 0
            }
        }
        else {
            newGameCard = {
                id: results.id,
                nome: results.name,
                img: results.background_image,
                descricao: results.description_raw,
                metacritic: results.metacritic,
            }            
        }

        setGameCardState(newGameCard)
        setIsSearching(false)
    }    

    // Função de cliente que serve como 'ponte': prepara os dados e chama a Server Action (addGame)
    const SaveGame = async (formData:FormData) => {
        const comentario = formData.get('comentario') as string
        const avaliacao = Number(formData.get('avaliacao'))

        if (gameCardState && gameCardState.id !== 0) {
            const gameToSave: GameProps = {
                ...gameCardState,
                avaliacao: avaliacao,
                comentario: comentario
            }
            
            await addGame(gameToSave)
        }
    }

    return (
    <section>
        <Link href="/dashboard">Voltar</Link>
        <form onSubmit={SearchGame} className="">
            <input 
                type="text"
                id="search_name"
                name="search_name"
                placeholder="Pesquisar" 
                aria-label="Pesquisar"
            />
            <label htmlFor="search_name" aria-hidden='true' hidden></label>
            <button type="submit" disabled={isSearching}>
                {
                    isSearching ? 
                    'Pesquisando...' :
                    <Image 
                        src="/icons/icons8-search.svg"
                        alt="Botão de pesquisar"
                        width={24}
                        height={24}
                    />
                }
            </button>
        </form>
        {gameCardState && <GameCard {...gameCardState} />}
        {gameCardState && gameCardState.id !== 0 && (
            <form action={SaveGame}>
                <p>Comentário:</p>
                <input 
                    type="text"
                    id="comentario"
                    name="comentario"
                />
                <label htmlFor="comentario"></label>
                <p>Minha avaliação:</p>
                <fieldset>
                    {/* A ordem é invertida (de 5 para 1) para facilitar o CSS (acender as estrelas) */}
                    <input type="radio" id="estrela 5" name="avaliacao" value="5" />
                    <label htmlFor="estrela 5">★</label>
                    
                    <input type="radio" id="estrela 4" name="avaliacao" value="4" />
                    <label htmlFor="estrela 4">★</label>
                    
                    <input type="radio" id="estrela 3" name="avaliacao" value="3" />
                    <label htmlFor="estrela 3">★</label>
                    
                    <input type="radio" id="estrela 2" name="avaliacao" value="2" />
                    <label htmlFor="estrela 2">★</label>
                    
                    <input type="radio" id="estrela 1" name="avaliacao" value="1" />
                    <label htmlFor="estrela 1">★</label>
                </fieldset>
                <BotaoSalvar />
            </form>
        )}
    </section>
    )
}