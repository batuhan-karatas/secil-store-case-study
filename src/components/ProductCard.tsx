import { Product } from "@/types/collectionTypes";
import Image from "next/image";

const ProductCard = (product: Product) => {
  return (
    <div
      key={product.productCode}
      className={`relative group border rounded-lg overflow-hidden shadow-sm bg-white
        ${product.outOfStock ? "border-red-500" : "border-black"}
        ${product.isSaleB2B ? "border-black" : "border-yellow-500"}
      `}
    >
      {/* Image Container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name || "Ürün Resmi"}
          className="w-full h-full object-cover transition duration-300 group-hover:blur-xs"
          width={200}
          height={300}
        />

        {/* Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">
          <button 
          className="bg-black cursor-pointer text-white px-8 py-2 text-sm font-semibold rounded"
          >
            Ekle
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
