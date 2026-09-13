"use client";

import { useState, useEffect } from "react";
import EcommerceProductCard, { Product } from "./ProductCardComponent";

export default function ProductCardListComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((item) => (
          <EcommerceProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}