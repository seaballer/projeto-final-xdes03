import { redirect } from "next/navigation";
import { deletarCookieSessao } from "../lib/session"

export default function LogoutButton(){

    const logout = async () => {
        'use server';
        await deletarCookieSessao();
        redirect('/login');
    }

    return(
        <form action={logout}>
            <button>Logout</button>
        </form>
    )  
}