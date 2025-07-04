import Link from "next/link"
import DB from "../lib/db"

const db : string = 'jogos-salvos.json'

export default async function DisplayGames() {

    const dados = await DB.dbLer(db)

    return (
        <div className="">
            <Link href={'/dashboard/create'} className="">Adicionar jogo</Link>
            <div className="">
                {}
            </div>
        </div>
    )
}