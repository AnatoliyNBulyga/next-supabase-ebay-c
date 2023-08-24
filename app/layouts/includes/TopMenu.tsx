"use client";

import Link from "next/link";
import {BsChevronDown} from "react-icons/bs";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {useRouter} from "next/navigation";
import {useUser} from "@/context/user";
import {useState} from "react";
import {useCart} from "@/context/cart";
import ClientOnly from "@/components/ClientOnly";
import {CartContextType, UserContextType} from "@/types";
import Image from "next/image";

export default function TopMenu() {
    const router = useRouter();
    const user = useUser() as UserContextType;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cart = useCart() as CartContextType;

    const isLoggedIn = () => {
        if (user && user?.id) {
            return (
                <button
                    onClick={() => isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)}
                    className="flex items-center gap-2 hover:underline cursor-pointer"
                >
                    <div>Hi, {user.name}</div>
                    <BsChevronDown />
                </button>
            )
        }

        return (
            <Link href="/auth" className="flex items-center gap-2 hover:underline cursor-pointer">
                <div>Login</div>
                <BsChevronDown />
            </Link>
        )
    }

    return (
        <ClientOnly>
            <div id="TopMenu" className="border-b">
                <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <ul
                        id="TopMenuLeft"
                        className="flex items-center text-[11px] text-[#333333] px-2 h-8"
                    >
                        <li className="relative px-3">
                            { isLoggedIn() }

                            {
                                isMenuOpen
                                    ?
                                    <div
                                        id="AuthDropdown"
                                        className="absolute bg-white w-[200px] text-[#333333] z-40 top-[20px] left-0 border shadow-lg"
                                    >
                                        <div className="flex items-center justify-start gap-1 p-3">
                                            <div className="aspect-square relative overflow-hidden">
                                                <Image
                                                    fill
                                                    src={user?.picture as string}
                                                    alt="photo"
                                                    className="object-cover object-center"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            {/*<img width={50} src={user?.picture as string} alt="photo"/>*/}
                                            <div className="font-bold text-[13px] ml-2">{user?.name}</div>
                                        </div>

                                        <div className="border-b" />

                                        <ul className="bg-white">
                                            <li className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer">
                                                <Link href="/orders">
                                                    My orders
                                                </Link>
                                            </li>
                                            <li
                                                onClick={() => { user.signOut(); setIsMenuOpen(false) }}
                                                className="text-[11px] py-2 px-4 w-full hover:underline text-blue-500 hover:text-blue-600 cursor-pointer"
                                            >
                                                Sign out
                                            </li>
                                        </ul>
                                    </div>
                                    : null
                            }
                        </li>
                        <li className="px-3 hover:underline cursor-pointer">
                            Daily Deals
                        </li>
                        <li className="px-3 hover:underline cursor-pointer">
                            Help & Contact
                        </li>
                    </ul>

                    <ul
                        id="TopMenuRight"
                        className="flex items-center text-[11px] text-[#333333] px-2 h-8"
                    >

                        <li className="flex items-center gap-2 px-3 hover:underline cursor-pointer">
                            <img width={32} src="/images/uk.png" alt="flag image"/>
                            Ship to
                        </li>
                        <li className="px-3 hover:underline cursor-pointer">
                            <div
                                onClick={() => router.push('/cart')}
                                className="relative"
                            >
                                <AiOutlineShoppingCart size={22} />
                                {
                                    cart.cartCount() > 0

                                    &&

                                    <div className="absolute text-[10px] -top-[2px] -right-[5px] bg-red-500 w-[14px] h-[14px] rounded-full text-white">
                                        <div className=" flex items-center justify-center -mt-[1px]">{cart.cartCount()}</div>
                                    </div>
                                }

                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </ClientOnly>
    )
}