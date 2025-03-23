import { useCollectionStore } from "@/store/useCollectionStore";
import ConstantProductCard from "@/components/ConstantProductCard";
import { useState } from "react";
import { CircleAlert, ImageIcon } from "lucide-react";

const TOTAL_PAGES = 4;

interface ConstantProductsProps {
  columns: number;
 
}

const ConstantProducts = ({ columns }: ConstantProductsProps) => {
  const constantProducts = useCollectionStore((state) => state.constantProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const itemsPerPage = columns * 4; // 4 rows
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedProducts = constantProducts.slice(startIndex, endIndex);
  const remainingSlots = itemsPerPage - paginatedProducts.length;

  return (
    <div className="p-4 overflow-auto">
      {/* Layout Options */}
     

      {/* Product Grid */}
      <div className={`grid grid-cols-${columns} gap-4 overflow-y-auto max-h-[58vh]`}>
        {paginatedProducts.map((product) => (
          <ConstantProductCard key={product.productCode} product={product} />
        ))}

        {/* Fill remaining slots with empty cards */}
        {Array.from({ length: remainingSlots }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="border rounded-lg h-86 flex items-center justify-center bg-gray-50"
          >
            <ImageIcon size={48} className="text-gray-300" />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ‹
        </button>

        {Array.from({ length: TOTAL_PAGES }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, TOTAL_PAGES))}
          disabled={currentPage === TOTAL_PAGES}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          ›
        </button>
      </div>
        {/* Confirmation Modal */}
        {confirmModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2">Uyarı!</h3>
                <div className="flex justify-center my-4">
                    <CircleAlert size={32} className="text-red-500" />
                </div>
                <p className="text-sm text-gray-800 mb-6">Sabitlerden Çıkarılacaktır Emin Misiniz?</p>

                <div className="flex justify-center gap-4">
                    <button
                    onClick={() => setConfirmModalOpen(false)}
                    className="px-5 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                    Vazgeç
                    </button>
                    <button
                    onClick={() => {
                        setConfirmModalOpen(false);
                        // optionally add save logic here
                    }}
                    className="px-5 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                    >
                    Onayla
                    </button>
                </div>
                </div>
            </div>
            )}

    </div>
  );
};

export default ConstantProducts;
