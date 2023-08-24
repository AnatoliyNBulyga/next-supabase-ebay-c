"use client";

import TopMenu from "@/app/layouts/includes/TopMenu";
import MainHeader from "@/app/layouts/includes/MainHeader";
import SubMenu from "@/app/layouts/includes/Submenu";
import Footer from "@/app/layouts/includes/Footer";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";

export default function MainLayout({ children }: { children: React.ReactNode}) {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.addEventListener("storage", () => {
            let res = JSON.parse(localStorage.getItem('isLoading') || 'false');
            setIsLoading(res);
        });
    }, []);

    return (
        <div id="Mainlayout" className="min-w-[1050px] max-w-[1300px] mx-auto">
            <div>
                {
                    isLoading && <Loading />
                }
                <TopMenu />
                <MainHeader />
                <SubMenu />

                {children}

                <Footer />
            </div>
        </div>
    )
}