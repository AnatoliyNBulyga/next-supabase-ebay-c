'use client'

import { usePathname } from "next/navigation";
import {ProductType} from "@/types";

interface CheckoutItemProps {
    product: ProductType
}

export default function CheckoutItem ({ product }: CheckoutItemProps) {
    const pathname = usePathname();

    return (
        <div className="relative flex justify-start my-2 border w-full p-4">
            <img src={product.url + '/150'} className="rounded-md w-[150px] h-[150px]" alt="Checkout image"/>

            <div className="overflow-hidden pl-2">
                <div className="font-semibold">
                    { product.title }
                </div>

                <div className="text-lg font-semibold ">
                    <span className="font-bold">£{(product.price / 100).toFixed(2)}</span>
                </div>

                <div className="relative flex items-center text-[14px] text-gray-500">
                    <div className="line-through">£{((product.price * 1.2) / 100).toFixed(2)}</div>
                    <div className="px-2">-</div>
                    <div className="line-through">20%</div>
                </div>

                <div className="text-sm mt-2">
                    {product.description.substring(0, 130)}...
                </div>

                {
                    pathname === '/cart' ?
                        <div className="text-sm mt-2 w-full flex justify-end underline text-blue-500 cursor-pointer">
                            Remove
                        </div>
                        : null
                }
            </div>
        </div>
    )
}