
import {NextResponse} from "next/server";
import prisma from "@/libs/Prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params
        const product = await prisma.products.findUnique({
            where: { id: Number(id) }
        })
        await prisma.$disconnect();
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}