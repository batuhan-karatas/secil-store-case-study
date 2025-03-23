import { Product } from "@/types/collectionTypes";
import { useCollectionStore } from "@/store/useCollectionStore";
import Image from "next/image";

const ProductCard = (product: Product) => {
  const addProductToConstants = useCollectionStore((state) => state.addProductToConstants);
  const constantProducts = useCollectionStore((state) => state.constantProducts);

  const isAdded = constantProducts.some((p) => p.productCode === product.productCode);

  const handleAdd = () => {
    if (!isAdded) {
      addProductToConstants(product);
    }
  };

  return (
    <div
      key={product.productCode}
      className={`relative group border rounded-lg overflow-hidden shadow-sm bg-white transition
        ${product.outOfStock ? "border-red-500" : "border-black"}
        ${product.isSaleB2B ? "border-black" : "border-yellow-500"}
      `}
    >
      {/* Image Container */}
      <div className="relative w-full h-72 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name || "Ürün Resmi"}
          className="w-full h-full object-cover transition duration-300 group-hover:blur-xs"
          width={200}
          height={300}
        />

        {/* Always-visible button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`px-8 py-2 text-sm font-semibold rounded transition ${
              isAdded
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white opacity-0 group-hover:opacity-100 hover:bg-gray-800"
            }`}
          >
            {isAdded ? "Eklendi" : "Ekle"}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 text-center text-sm">
        <p className="font-semibold">{product.name || "Ürün Adı Yok"}</p>
        <p className="text-gray-600">{product.productCode}</p>
      </div>
    </div>
  );
};

export default ProductCard;
