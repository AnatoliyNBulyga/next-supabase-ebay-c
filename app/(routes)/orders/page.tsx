"use client"

import Link from "next/link";
import { CiDeliveryTruck } from 'react-icons/ci'
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import moment from "moment";
import {useUser} from "@/context/user";
import useIsLoading from "@/hooks/useIsLoading";
import MainLayout from "@/app/layouts/MainLayout";
import {OrderItemType, OrdersType, UserContextType} from "@/types";
import Image from "next/image";

export default function TopMenu() {

    const { user } = useUser() as UserContextType;
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            if (!user) return
            const response = await fetch("/api/orders");
            const result = await response.json();
            setOrders(result);
        } catch (error) {
            toast.error('Something went wrong?', { autoClose: 3000 });
        } finally {
            useIsLoading(false);
        }
    }

    useEffect(() => {
        useIsLoading(true);
        getOrders();
    }, [user]);


    return (
        <MainLayout>
            <div id="OrdersPage" className="mt-4 max-w-[1200px] mx-auto px-2 min-h-[50vh]">
                <div className="bg-white w-full p-6 min-h-[150px]">
                    <div className="flex items-center text-xl">
                        <CiDeliveryTruck className="text-green-500" size={35}/>
                        <span className="pl-4">Orders</span>
                    </div>
                    {
                        orders.length < 1
                            ?
                                <div className="flex items-center justify-center">
                                    You have no order history
                                </div>
                            :   null
                    }

                    {orders.map((order: OrdersType) => (
                        <div key={order?.id} className="text-sm pl-[50px]">
                            <div className="border-b py-1">

                                <div className="pt-2">
                                    <span className="font-bold mr-2">Stripe ID:</span>
                                    {order?.stripe_id}
                                </div>

                                <div className="pt-2">
                                    <span className="font-bold mr-2">Delivery Address:</span>
                                    {order?.name}, {order?.address}, {order?.zipcode}, {order?.city}, {order?.country}
                                </div>

                                <div className="pt-2">
                                    <span className="font-bold mr-2">Total:</span>
                                    £{order?.total / 100}
                                </div>

                                <div className="pt-2">
                                    <span className="font-bold mr-2">Order Created:</span>
                                    { moment(order?.created_at).calendar() }
                                </div>

                                <div className="py-2">
                                    <span className="font-bold mr-2">Delivery Time:</span>
                                    {moment(order?.created_at).add(3, 'days').calendar()}
                                </div>

                                <div className="flex items-center gap-4">
                                    {order?.orderItem.map((item: OrderItemType) => (
                                        <div key={item.id} className="flex items-center">
                                            <Link
                                                className="py-1 hover:underline text-blue-500 font-bold"
                                                href={`/product/${item.product_id}`}
                                            >
                                                <div className="aspect-square relative overflow-hidden w-[120px] rounded">
                                                    <Image
                                                        fill
                                                        src={item.product?.url+'/120'}
                                                        alt="Product preview"
                                                        className="object-cover object-center"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                </div>
                                                {item.product?.title}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}