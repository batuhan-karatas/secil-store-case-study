"use client";
import CollectionProducts from "@/components/CollectionProducts";
import FilterPanelModal from "@/components/FilterPanelModal";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";


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

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Filter Panel Header */}
      <div className="flex justify-between items-center w-full flex-wrap gap-3">
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

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left Side - Collection Products */}
        <CollectionProducts />

        {/* Right Side Placeholder (Sabitler) */}
        <div className="w-1/2 border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">Sabitler</h2>
          <p>Right side structure to be implemented next...</p>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterPanelModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        setSelectedFilters={setSelectedFilters}
      />
    </div>
  );
}
