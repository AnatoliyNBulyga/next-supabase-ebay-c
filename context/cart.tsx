"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";
import { CartContextType } from "@/types";


const Context = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const [isItemAdded, setIsItemAdded] = useState(false);

    const getCart = () => {
        let cart = [];

        if (typeof localStorage !== 'undefined') {
            cart = JSON.parse(localStorage.getItem('cart') || "") || [];
        }

        return cart;
    };

    const addToCart = (product: any) => {
        let cart = [];

        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart") || "") || [];
        }

        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));
        setIsItemAddedToCart(product);
        router.refresh();
    };

    const removeFromCart = (product: any) => {
        let cart = [];
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart') || "") || [];
        }
        cart = cart.filter((item: any) => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        setIsItemAddedToCart(product);
        router.refresh();
    };

    const setIsItemAddedToCart = (product: any) => {
        let cart = [];

        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart") || "") || [];
        }

        cart = cart.filter((item: any) => item.id === product.id);

        if (cart.length > 0) {
            setIsItemAdded(true);
            return
        }

        setIsItemAdded(false);
    };

    const cartCount = () => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart') || "") || [];
        }
        return cart.length
    }

    const cartTotal = () => {
        let cart = [];

        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem("cart") || "") || [];
        }

        const total = cart.reduce((acc: number, item: { price: number }) => {
            return acc + Number(item.price);
        }, 0);

        return total;

    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        router.refresh();
    };

    const exposed = {
        isItemAdded,
        getCart,
        addToCart,
        removeFromCart,
        setIsItemAddedToCart,
        cartCount,
        cartTotal,
        clearCart
    };

    return <Context.Provider value={exposed} >{children}</Context.Provider>
};

export const useCart = () => useContext(Context);

export default CartProvider;

