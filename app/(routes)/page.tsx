"use client";

import CarouselComp from "@/components/CarouselComp";
import Product from "@/components/Product";
import {useEffect, useState} from "react";
import useIsLoading from "@/hooks/useIsLoading";
import MainLayout from "@/app/layouts/MainLayout";
import {ProductType} from "@/types";

export default function Home() {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        useIsLoading(true);

        const response = await fetch('/api/products');
        const prods = await response.json();

        setProducts(prods);
        useIsLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

  return (
    <MainLayout>
      <CarouselComp />

      <div className="max-w-[1300px] mx-auto">
          <div className="text-2xl font-bold mt-12 mb-6 px-6">
              Daily Deals
          </div>

          <div className="grid grid-cols-5 gap-4">
              {products.map((product: ProductType) => (
                  <Product key={product.id} product={product} />
              ))}
          </div>
      </div>
    </MainLayout>
  )
}
