
import { NextResponse } from "next/server";
import prisma from "@/libs/Prisma";

export async function GET(req: Request, context: { params: { name: string } }) {
    try {
        const { name } = context.params

        const items = await prisma.products.findMany({
            take: 5,
            where: {
                title: {
                    contains: name,
                    mode: 'insensitive'
                },
            },
        });
        await prisma.$disconnect();
        return NextResponse.json(items);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}