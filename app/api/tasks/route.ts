import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {

        const tasks = await prisma.task.findMany(
            {
                orderBy: {
                    createdAt: 'desc',
                },
            }
        )
        return NextResponse.json(tasks, { status: 200})
    }
    catch(error){
        console.log("Failed to fetch tasks", error);

        return NextResponse.json({error: "Failed to fetch tasks"}, {status: 500})
    }
}

export async function  POST(request: NextRequest) {

    try {

    const body = await request.json();
    const { title, description } = body;

    if(!title || title.trim() === ''){
        return NextResponse.json(
            {error: 'Title is required'},
            {status: 400}
        )
    }

    /*Prisma accepts bunch of properties out of which one is data hence we need to specify it all the time*/
    const newTask = await prisma.task.create({
        data: {
            title: title.trim(),
            description: description?.trim() || null
        }
        });

    /*NextResponse allows to appropriately populate API response within Next.js*/
     return NextResponse.json(newTask,{status: 201})
    }
    catch(error){
        console.log("Failed to add tasks", error);
        return NextResponse.json({error: "Failed to create tasks"}, {status: 500})
    }
}