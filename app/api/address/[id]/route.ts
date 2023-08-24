import prisma from "@/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
    const supabase = createServerComponentClient({ cookies });

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error();

        const res = await prisma.addresses.findUnique({
            where: { user_id: user?.id }
        })

        await prisma.$disconnect();
        return NextResponse.json(res);

    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}