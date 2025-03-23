"use client";
import { useEffect, useState } from "react";
import { useCollectionStore } from "@/store/useCollectionStore";
import { getProductsByFilters } from "@/app/api/getProductsByFilters";
import ProductCard from "./ProductCard";



export default function CollectionProducts() {
  const { selectedCollection,selectedCollectionProducts,setSelectedCollectionProducts } = useCollectionStore();
  const [isLoading, setIsLoading] = useState(true); // ← Added

  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCollection?.filters?.filters?.length) {
        setIsLoading(true); // ← Set loading true before request
        const response = await getProductsByFilters(selectedCollection.filters.filters);
        setSelectedCollectionProducts(response);
        setIsLoading(false); // ← End loading after fetch
      }
    };
    fetchProducts();
  }, [selectedCollection, setSelectedCollectionProducts]);

  if (!selectedCollection) return <p className="p-4">No collection selected.</p>;

  return (
    <div className="w-1/2 border p-4 rounded overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Koleksiyon Ürünleri</h2>

      {isLoading ? (
        <p className="text-xl text-gray-600">Ürünler yükleniyor...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 ">
          {selectedCollectionProducts?.length !== 0 
          ? (
            selectedCollectionProducts?.map((product) => (
            <ProductCard key={product.productCode} {...product} />
            ))
          ):
          <p>Ürün bulunamadı.</p>}
        </div>
      )}
    </div>
  );
}
 