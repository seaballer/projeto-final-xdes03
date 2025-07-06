import Link from "next/link"
import { obterSessaoSeValida } from "../lib/session";
import LogoutButton from "./logoutButton";
import UserInfo from "./userInfo";

export default async function Header() {

    const isLogged = await obterSessaoSeValida();
    let userEmail: string = "";
    if(isLogged)
    {
        userEmail = isLogged?.userEmail as string;
    }

    return (
        <header>
            <section className=''>
            <h2><Link href="/dashboard">MyGameList</Link></h2>
            <nav>
                <ul>
                    <li><Link href='https://rawg.io/apidocs' target="blank">RAWG API</Link></li>
                </ul>
            </nav>
            </section>
            <section>
                {isLogged && <UserInfo userEmail={userEmail}/>}
                {isLogged && <LogoutButton />}
            </section>
        </header>
    )
}