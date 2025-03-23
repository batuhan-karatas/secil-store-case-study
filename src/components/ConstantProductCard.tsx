import { Product } from "@/types/collectionTypes";
import { useCollectionStore } from "@/store/useCollectionStore";
import Image from "next/image";
import { Trash2, CircleAlert } from "lucide-react";
import { useState } from "react";

interface ConstantProductCardProps {
  product: Product;
}

const ConstantProductCard = ({ product }: ConstantProductCardProps) => {
  const removeProductFromConstants = useCollectionStore((state) => state.removeProductFromConstants);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRemove = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    removeProductFromConstants(product.productCode);
    setShowConfirmModal(false);
  };

  return (
    <>
      {/* Product Card */}
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

          {/* Delete Button */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button
              onClick={handleRemove}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 hover:bg-red-700 transition"
            >
              <Trash2 size={16} />
              Sil
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2 text-center text-sm">
          <p className="font-semibold">{product.name || "Ürün Adı Yok"}</p>
          <p className="text-gray-600">{product.productCode}</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">Uyarı!</h3>
            <div className="flex justify-center my-4">
              <CircleAlert size={32} className="text-red-500" />
            </div>
            <p className="text-sm text-gray-800 mb-6">
              Sabitlerden Çıkarılacaktır Emin Misiniz?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
              >
                Vazgeç
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              >
                Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConstantProductCard;
