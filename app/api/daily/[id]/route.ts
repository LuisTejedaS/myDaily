import { Prisma } from '@prisma/client'
import prisma from '../../../db'

export async function GET(req: Request) {
    let idS = new URL(req.url).pathname.split("/").pop()

    if (idS === undefined) {
        return new Response("ID was empty", { status: 400 });
    }
    let id = parseInt(idS);
    try {
        const allDailies = await prisma.daily.findFirst({
            where: {
                id: {
                    equals: id,
                },
            },
            orderBy: { date: Prisma.SortOrder.asc },
        })
        return Response.json(allDailies)
    }
    catch (e) {
        console.log(e)
    }
}

export async function DELETE(req: Request) {
    let idS = new URL(req.url).pathname.split("/").pop()

    if (idS === undefined) {
        return new Response("ID was empty", { status: 400 });
    }
    let id = parseInt(idS);
    try {
        const allDailies = await prisma.daily.delete({
            where: {
                id: id
            }
        })
        return Response.json(allDailies)
    }
    catch (e) {
        console.log(e)
    }
}