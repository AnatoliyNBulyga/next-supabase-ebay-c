import prisma from "@/libs/Prisma";
import { NextResponse } from "next/server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const supabase = createServerComponentClient({ cookies });

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error();

        const body = await req.json();

        const res = await prisma.addresses.create({
            data: {
                user_id: user?.id,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country
            }
        })

        await prisma.$disconnect();
        return NextResponse.json(res);

    } catch (error) {
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse('Something went wrong', { status: 400 });
    }
}