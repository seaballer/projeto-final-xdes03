import { promises as fs } from "fs";
import path from "path";

const dbPathBase = path.join(process.cwd(), "src", "app", "db");

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
async function dbLer(arquivo: string): Promise<Array<any>> {
    const dbPath = path.join(dbPathBase, arquivo);
    const dados = await fs.readFile(dbPath, "utf-8");

    return JSON.parse(dados);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
async function dbSalvar(arquivo: string, dados: any) {
    const dbPath = path.join(dbPathBase, arquivo);
    await fs.writeFile(dbPath, JSON.stringify(dados, null, 2));
}

const DB = {
    dbLer,
    dbSalvar
}

export default DB;