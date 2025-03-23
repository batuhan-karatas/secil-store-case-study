"use client";
import CollectionProducts from "@/components/CollectionProducts";
import ConstantProducts from "@/components/ConstantProducts";
import FilterPanelModal from "@/components/FilterPanelModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Grid2x2,CircleAlert, CheckCheck,Square, LayoutPanelTop } from "lucide-react";


/* 
    For filter panel I just added ui elements and some state management.
    The actual filtering logic is not implemented yet.
    Filter API response is too complicated to implement on the products.
    Products has no enough data to filter them properly.
    Just color filtering is possible for now, but some collections are already filter the color.
    So I just added a dummy filter panel for the UI.
*/



export default function EditCollectionPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [columns, setColumns] = useState(3); // Options: 2, 3, 4

  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Filter Panel Header */}
      <div className="flex justify-between items-center w-full flex-wrap gap-3 bg-white p-4 rounded shadow-sm">
        {/* Selected Filters Row */}
        <div className="flex flex-wrap gap-2">
          {selectedFilters.length > 0 ? (
            selectedFilters.map((filter, index) => (
              <span
                key={index}
                className="flex items-center gap-1 text-sm px-3 py-1 border rounded-full bg-gray-100 text-gray-700"
              >
                {filter}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-400">Kriter seçilmedi</span>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-1 border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
        >
          <span className="text-sm font-medium">Filtreler</span>
          <SlidersHorizontal size={16} />
        </button>
      </div>

        {/* Columns Selector */}
        <div className="flex flex-row items-end justify-end gap-2">
            
            {/* Info Icon */}
            <button className="w-9 h-9 flex items-center justify-center cursor-pointer">
                <CircleAlert size={24} />
            </button>

            {/* 2 Columns */}
            <button
                onClick={() => setColumns(2)}
                className={`w-9 h-9 border rounded-md flex items-center justify-center cursor-pointer ${
                columns === 2 ? "border-green-500 ring-2 ring-green-300" : "border-none"
                }`}
            >
                <Square size={24} />
            </button>

            {/* 3 Columns */}
            <button
                onClick={() => setColumns(3)}
                className={`w-9 h-9 border rounded-md flex items-center justify-center cursor-pointer ${
                columns === 3 ? "border-green-500 ring-2 ring-green-300" : "border-none"
                }`}
            >
                <LayoutPanelTop size={24} />
            </button>

            {/* 4 Columns */}
            <button
                onClick={() => setColumns(4)}
                className={`w-9 h-9 border rounded-md flex items-center justify-center cursor-pointer ${
                columns === 4 ? "border-green-500 ring-2 ring-green-300" : "border-none"
                }`}
            >
                <Grid2x2 size={24} />
            </button>
            </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Side - Collection Products */}
        <CollectionProducts />

        {/* Right Side Placeholder (Sabitler) */}
        <div className="w-1/2 border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Sabitler</h2>
          <ConstantProducts columns = {columns} />
        </div>
      </div>

      {/* Filter Modal */}
      <FilterPanelModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        setSelectedFilters={setSelectedFilters}
      />

      {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
        <button
            onClick={() => router.push("/collections")} // or use router.push
            className="px-6 py-2 bg-black text-white text-sm rounded hover:opacity-80"
        >
            Vazgeç
        </button>
        <button
            onClick={() => setConfirmModalOpen(true)}
            className="px-6 py-2 bg-black text-white text-sm rounded hover:opacity-80"
        >
            Kaydet
        </button>
        </div>

        {/* Confirmation Modal */}
            {confirmModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg text-center">
                <h3 className="text-xl font-bold mb-2">Kaydet</h3>
                <div className="flex justify-center my-4">
                    <CheckCheck size={32} className="text-green-500" />
                </div>
                <p className="text-sm text-gray-800 mb-6">Sabitler Kaydedilecektir Emin misiniz?</p>

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
                        router.push("/collections");
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
}
