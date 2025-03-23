import { create } from "zustand";
import { Collection,Filter,Product } from "@/types/collectionTypes";

interface CollectionStore {
  collections: Collection[];
  selectedCollection: Collection | null;
  selectedCollectionProducts: Product[] | null;
  filters: Filter[] | null;
  setCollections: (collections: Collection[]) => void;
  setSelectedCollection: (collection: Collection | null) => void;
  setSelectedCollectionProducts: (products: Product[] | null) => void;
  setFilters: (filters: Filter[]) => void;
  clearFilters: () => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],
  selectedCollection: null,
  filters: null,
  selectedCollectionProducts: null,

  setCollections: (collections) => set({ collections }),
  setSelectedCollection: (collection) => set({ selectedCollection: collection }),
  setSelectedCollectionProducts: (products) => set({ selectedCollectionProducts: products }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: null }),
}));