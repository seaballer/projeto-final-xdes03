'use client'
import DB from "@/app/lib/db"
import { redirect } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import GameCard from "@/app/ui/GameCard"
import { GameProps } from "@/app/ui/GameCard"
import axios from 'axios'

const arquivo = 'jogos-salvos.json'

export default function CreateGame() {

    const [gameCardState, setGameCardState] = useState<GameProps | null>(null)

    const SearchGame = async (formData:FormData) => {
        const nomeJogo = formData.get('search_name') as string

        const {data} = await axios.get(`/api/search?query=${encodeURIComponent(nomeJogo)}`)

        let newGameCard: GameProps

        if (data.length === 0) {
            newGameCard = {
                id: 0,
                nome: 'Jogo não encontrado',
                img: 'https://cdn-icons-png.flaticon.com/512/6659/6659895.png',
                descricao: ''
            }            
        }
        else {
            newGameCard = {
                id: data[0].id,
                nome: data[0].nome,
                img: data[0].img,
                descricao: data[0].descricao
            }
        }

        setGameCardState(newGameCard)
    }    

    return (
    <section>
        <form action={SearchGame} className="">
            <input 
                type="text"
                id="search_game"
                name="search_game"
                placeholder="Pesquisar" 
                aria-label="Pesquisar"
            />
            <label htmlFor="search_game" aria-hidden='true' hidden></label>
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
    </section>
    )
}