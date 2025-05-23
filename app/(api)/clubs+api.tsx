import { client } from "@/config/NilePostgresConfig";

export async function GET(request:Request){
    await client.connect();

    const result = await client.query(`select * from clubs order by name asc`)

    await client.end();

    return Response.json(result.rows)
}

export async function POST(request:Response){
    const {name,clublogo,about} = await request.json();
    await client.connect();
    const result = await client.query(`insert into clubs values 
        (DEFAULT,'${name}','${clublogo}','${about}',DEFAULT) `)

    await client.end();

    return Response.json(result.rows)
}