import {User} from "@supabase/supabase-js";

export type UserContextType = {
    user: User | null;
    id: string | null;
    email: string | null | undefined;
    name: string | null | undefined;
    picture: string | null | undefined;
    signOut: () => Promise<void>;
}

export type CurrentAddressType = {
    id: string,
    name: string,
    address: string,
    zipcode: string,
    city: string,
    country: string
}

export type CartContextType = {
    isItemAdded: boolean;
    getCart: () => any;
    addToCart: (product: any) => void;
    removeFromCart: (product: any) => void;
    setIsItemAddedToCart: (product: any) => void;
    cartCount: () => any;
    cartTotal: () => any;
    clearCart: () => void;
}

export type ProductType = {
    id: number;
    title: string;
    description: string;
    url: string;
    price: number;
    created_at: string;
    orderItem: OrderItemType[];
}

export type OrdersType = {
    id: number;
    user_id: string;
    stripe_id: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    total: number;
    created_at: Date;
    orderItem: OrderItemType[];
}

export type OrderItemType = {
    id: number;
    order_id: number;
    product_id: number;
    order: OrdersType[];
    product: ProductType;
}