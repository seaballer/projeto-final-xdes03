'use client'
import Image from "next/image"
import { useState } from "react"
import GameCard from "@/app/ui/GameCard"
import { GameProps } from "@/app/ui/GameCard"
import axios from 'axios'
import { addGame } from "@/app/lib/action"

const arquivo = 'jogos-salvos.json'

export default function CreateGame() {

    const [gameCardState, setGameCardState] = useState<GameProps | null>(null)

    const [isSaving, setIsSaving] = useState(false); //Para que o botão de adicionar jogo não seja clicado várias vezes enquanto estiver esperando o game ser adicionado na biblioteca, ou seja, sendo salvo

    const SearchGame = async (formData:FormData) => {

        const nomeJogo = formData.get('search_name') as string

        const {data} = await axios.get(`/api/search?query=${encodeURIComponent(nomeJogo)}`)

        let newGameCard: GameProps

        const results = data.results[0]

        if (!nomeJogo || nomeJogo.length === 0) {
            newGameCard = {
                id: 0,
                nome: 'Jogo não encontrado',
                img: 'https://cdn-icons-png.flaticon.com/512/6659/6659895.png',
                descricao: ''
            }
        }
        else {
            newGameCard = {
                id: results.id,
                nome: results.name,
                img: results.background_image,
                descricao: results.description
            }            
        }

        setGameCardState(newGameCard)
    }    

    const SaveGame = async () => {
        if (gameCardState && gameCardState.id !== 0) {
            setIsSaving(true)
            await addGame(gameCardState)
        }
    }

    return (
    <section>
        <form action={SearchGame} className="">
            <input 
                type="text"
                id="search_name"
                name="search_name"
                placeholder="Pesquisar" 
                aria-label="Pesquisar"
            />
            <label htmlFor="search_name" aria-hidden='true' hidden></label>
            <button>
                <Image 
                    src="/icons/icons8-search.svg"
                    alt="Botão de pesquisar"
                    width={24}
                    height={24}
                />
            </button>
        </form>
        {gameCardState && <GameCard {...gameCardState} />}
        {gameCardState && gameCardState.id !== 0 && (
            <button onClick={SaveGame} disabled={isSaving}>
                {isSaving ? 'Salvando...' : 'Adicionar jogo'}
            </button>
        )}
    </section>
    )
}