import { create } from "zustand";
import { Collection,Filter,Product } from "@/types/collectionTypes";

interface CollectionStore {
  collections: Collection[];
  selectedCollection: Collection | null;
  selectedCollectionProducts: Product[] | null;
  constantProducts: Product[];
  filters: Filter[] | null;


  setCollections: (collections: Collection[]) => void;
  setSelectedCollection: (collection: Collection | null) => void;
  setSelectedCollectionProducts: (products: Product[] | null) => void;
  setFilters: (filters: Filter[]) => void;
  clearFilters: () => void;

  addProductToConstants: (product: Product) => void;
  removeProductFromConstants: (productId: string) => void;
  clearConstantProducts: () => void;
}

export const useCollectionStore = create<CollectionStore>((set,get) => ({
  collections: [],
  selectedCollection: null,
  filters: null,
  selectedCollectionProducts: null,
  constantProducts: [],

  setCollections: (collections) => set({ collections }),
  setSelectedCollection: (collection) => set({ selectedCollection: collection }),
  setSelectedCollectionProducts: (products) => set({ selectedCollectionProducts: products }),
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: null }),

  addProductToConstants: (product) => {
    const existing = get().constantProducts.find((p) => p.productCode === product.productCode);
    if (existing) return; // prevent duplicates
    set((state) => ({
      constantProducts: [...state.constantProducts, product],
    }));
  },

  removeProductFromConstants: (productId) => {
    set((state) => ({
      constantProducts: state.constantProducts.filter((p) => p.productCode !== productId),
    }));
  },

  clearConstantProducts: () => set({ constantProducts: [] }),

}));