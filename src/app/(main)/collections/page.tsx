"use client";
import { useEffect, useState } from "react";
import { getCollections } from "@/app/api/getCollections";
import { useCollectionStore } from "@/store/useCollectionStore";
import { useRouter } from "next/navigation";
import { FiEdit3 } from "react-icons/fi";

export default function Page() {
  const { collections, setCollections, setSelectedCollection } = useCollectionStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollections();
      setCollections(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalPages = 9;
  const paginatedCollections = collections.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageClick = (page: number) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
      <button
        key={page}
        onClick={() => handlePageClick(page)}
        className={`w-8 h-8 rounded-md border text-sm flex items-center justify-center mx-1 ${
          page === currentPage ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
        }`}
      >
        {page}
      </button>
    ));
  };

  if (loading) return <p className="p-4">Loading collections...</p>;

  return (
    <div className="p-8 border border-gray-300 rounded bg-white">

      <div className="w-full rounded-2xl  overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 text-sm font-semibold border-b border-gray-300">
          <div className="p-3 ">Başlık</div>
          <div className="p-3 ">Ürün Koşulları</div>
          <div className="p-3 ">Satış Kanalı</div>
          <div className="p-3">İşlemler</div>
        </div>

        {paginatedCollections.map((collection, index) => (
          <div
            key={collection.id}
            className="grid grid-cols-4 text-sm border-b border-gray-200 hover:bg-gray-50 transition"
          >
            <div className="p-3  font-medium">
            {`Koleksiyon - ${(currentPage - 1) * pageSize + index + 1}:`} &nbsp; {collection.info?.name || "Bilinmiyor"}
            </div>
            <div className="p-3  whitespace-pre-line text-gray-700">
              {collection.filters?.filters && collection.filters.filters.length > 0 ? (
                collection.filters.filters
                  .filter(
                    (filter) => filter.title && filter.valueName && filter.valueName.toLowerCase() !== "null"
                  )
                  .map((filter) => `Ürün ${filter.title} bilgisi Şuna Eşit: ${filter.valueName}`)
                  .join("\n") || "-"
              ) : (
                "-"
              )}
            </div>
            <div className="p-3 ">Satış Kanalı - {collection.salesChannelId}</div>
            <div className="p-3 flex items-center justify-center">
              <button 
                className="hover:text-blue-600"
                onClick={() => {
                  setSelectedCollection(collection);
                  router.push("/collections/edit");
                }}
              >
                <FiEdit3 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-end items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center disabled:opacity-50"
          >
            ‹
          </button>
          {renderPageButtons()}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center disabled:opacity-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}