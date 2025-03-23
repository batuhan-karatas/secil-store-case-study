"use client";
import { useEffect, useState } from "react";
import { useCollectionStore } from "@/store/useCollectionStore";
import { getProductsByFilters } from "@/app/api/getProductsByFilters";
import ProductCard from "./ProductCard";
import { Product } from "@/types/collectionTypes";


export default function CollectionProducts() {
  const { selectedCollection } = useCollectionStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ← Added

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCollection?.filters?.filters?.length) {
        setIsLoading(true); // ← Set loading true before request
        const response = await getProductsByFilters(selectedCollection.filters.filters);
        setProducts(response);
        setIsLoading(false); // ← End loading after fetch
      }
    };
    fetchProducts();
  }, [selectedCollection]);

  if (!selectedCollection) return <p className="p-4">No collection selected.</p>;

  return (
    <div className="w-1/2 border p-4 rounded overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Koleksiyon Ürünleri</h2>

      {isLoading ? (
        <p className="text-xl text-gray-600">Ürünler yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 ">
          {products.map((product) => (
            <ProductCard key={product.productCode} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
 