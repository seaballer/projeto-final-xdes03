import Link from "next/link"
import DB from "../lib/db"
import GameCard from "../ui/GameCard"

const db : string = 'jogos-salvos.json'

export default async function DisplayGames() {

    const dados = await DB.dbLer(db)

    const games = dados.map((game) => {
        return <GameCard {...game} key={game.id} variant="dashboard"/>
    })

    return (
        <div className="">
            <Link href={'/dashboard/create'} className="">Adicionar jogo</Link>
            <div className="">
                {games}
            </div>
        </div>
    )
}