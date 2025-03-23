import { create } from "zustand";
import { Collection,Filter } from "@/types/collectionTypes";

interface CollectionStore {
  collections: Collection[];
  selectedCollection: Collection | null;
  filters: Filter[] | null;
  setCollections: (collections: Collection[]) => void;
  setSelectedCollection: (collection: Collection | null) => void;
  setFilters: (filters: Filter[]) => void;
  clearFilters: () => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  selectedCollection: null,
  filters: null,

  setCollections: (collections) => set({ collections }),
  setSelectedCollection: (collection) => set({ selectedCollection: collection }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: null }),
}));