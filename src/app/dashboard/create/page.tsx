import DB from "@/app/lib/db"
import { redirect } from "next/navigation"
import Image from "next/image"

const arquivo = 'jogos-salvos.json'

const CreateGame = () => {

    const SearchGame = async (formData:FormData) => {
        'use server'
        const nomeJogo = formData.get('search_name')

        if (!nomeJogo) {
            console.log('Busca inválida ou vazia')
            return
        }

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
    </section>
    )
}

export default CreateGame