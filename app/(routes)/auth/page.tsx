"use client";

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs"
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Link from 'next/link';
import Image from "next/image";


export default async function AuthPage() {
    const supabase = createClientComponentClient();

    return (
        <div id="AuthPage" className="w-full min-h-screen bg-white">

            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                <Link href="/" className="min-w-[170px]">
                    <div className="relative overflow-hidden w-[170px] h-[68px]">
                        <Image
                            fill
                            src="/images/logo.svg"
                            alt="Logo image"
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </Link>
            </div>

            <div className="w-full flex items-center justify-center p-5 border-b-gray-300">
                Login / Register
            </div>

            <div className="max-w-[400px] mx-auto px-2">
                <Auth
                    onlyThirdPartyProviders
                    redirectTo={`${process.env.ORIGIN_URL}/auth/callback`}
                    supabaseClient={supabase}
                    providers={['google']}
                    appearance={{theme: ThemeSupa}}
                />
            </div>

        </div>
    )
}