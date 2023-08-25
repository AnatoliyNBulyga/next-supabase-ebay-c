'use client';

import Link from "next/link";
import {ProductType} from "@/types";
import Image from "next/image";

interface ProductProps {
    product: ProductType
}
export default function Product({ product }: ProductProps) {

    return (
        <>
            <Link
                href={`/product/${product?.id}`}
                className='max-w-[200px] p-1.5 border border-gray-50 hover:border-gray-200 hover:shadow-xl bg-gray-100 rounded mx-auto'
            >
                { product?.url
                    ?
                    <div className="aspect-square relative overflow-hidden rounded cursor-pointer w-[186px]">
                        <Image
                            fill
                            src={product.url+'/186'}
                            alt="Product preview"
                            className="object-cover object-center"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    : null }

                <div className="pt-2 px-1">

                    <div className="font-semibold text-[15px] hover:underline cursor-pointer">{product?.title}</div>
                    <div className="font-extrabold">£{(product?.price / 100).toFixed(2)}</div>

                    <div className="relative flex items-center text-[12px] text-gray-500">
                        <div className="line-through">£{((product?.price * 1.2) / 100).toFixed(2)}</div>
                        <div className="px-2">-</div>
                        <div className="line-through">20%</div>
                    </div>

                </div>
            </Link>
        </>
    );
};