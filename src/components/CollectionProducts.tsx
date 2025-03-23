"use client";
import { useEffect, useState } from "react";
import { useCollectionStore } from "@/store/useCollectionStore";
import { useRouter } from "next/navigation";
import { getProductsByFilters } from "@/app/api/getProductsByFilters";
import ProductCard from "./ProductCard";

export default function CollectionProducts() {
  const { selectedCollection, selectedCollectionProducts, setSelectedCollectionProducts } = useCollectionStore();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // ✅ Redirect handled in useEffect
  useEffect(() => {
    if (!selectedCollection) {
      router.push("/collections");
    }
  }, [selectedCollection]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCollection?.filters?.filters?.length) {
        setIsLoading(true);
        const response = await getProductsByFilters(selectedCollection.filters.filters);
        setSelectedCollectionProducts(response);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCollection, setSelectedCollectionProducts]);

  if (!selectedCollection) return null; // prevent rendering before redirect

  return (
    <div className="w-1/2 border p-4 rounded overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Koleksiyon Ürünleri</h2>

      {isLoading ? (
        <p className="text-xl text-gray-600">Ürünler yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {selectedCollectionProducts && selectedCollectionProducts.length !== 0 ? (
            selectedCollectionProducts.map((product) => (
              <ProductCard key={product.productCode} {...product} />
            ))
          ) : (
            <p>Ürün bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
}
