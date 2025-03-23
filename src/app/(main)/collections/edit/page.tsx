"use client";
import CollectionProducts from "@/components/CollectionProducts";

export default function EditCollectionPage() {
  return (
    <div className="flex gap-6 p-4">
      <CollectionProducts />

      {/* Right Side Placeholder (Sabitler) */}
      <div className="w-1/2 border p-4 rounded">
        <h2 className="text-xl font-bold mb-2">Sabitler</h2>
        <p>Right side structure to be implemented next...</p>
      </div>
    </div>
  );
}
