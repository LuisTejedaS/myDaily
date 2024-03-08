import { Prisma } from '@prisma/client'
import prisma from '../../db'

async function createDaily(newDaily: string, dailyDate: any) {
    await prisma.daily.create({
        data: {
            content: newDaily,
            date: new Date(dailyDate.year, dailyDate.month, dailyDate.day)
        },
    })
}

async function updateDaily(id: number, newDaily: string, dailyDate: any) {
    await prisma.daily.update({
        where: {
            id: id,
        },
        data: {
            content: newDaily,
            date: new Date(dailyDate.year, dailyDate.month, dailyDate.day)
        },
    })
}

export async function POST(req: Request) {
    const body = await req.json()
    const newDaily: string = body.newDaily;
    const date: string = body.date;

    if (newDaily.trim() === '') {
        return new Response("Daily was empty", { status: 400 });
    };
    try {
        createDaily(newDaily, date);
    } catch (e) {
        console.log(e)
        return new Response("Error creating daily", { status: 500 });
    }
    return new Response("ok", { status: 200 });
}

export async function GET(req: Request) {
    let filterDate = new Date();
    filterDate.setDate(filterDate.getDate() - 5);
    console.log(filterDate)

    try {
        const allDailies = await prisma.daily.findMany({
            where: {
                date: {
                    gte: filterDate.toISOString(),
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


export async function PUT(req: Request) {
    const body = await req.json()
    const newDaily: string = body.newDaily;
    const date: string = body.date;
    const id: number = body.id;

    if (newDaily.trim() === '') {
        return new Response("Daily was empty", { status: 400 });
    };
    try {
        updateDaily(id, newDaily, date);
    } catch (e) {
        console.log(e)
        return new Response("Error creating daily", { status: 500 });
    }
    return new Response("ok", { status: 200 });
}