"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface FilterPanelModalProps {
  open: boolean;
  onClose: () => void;
  setSelectedFilters: (filters: string[]) => void;
}

export default function FilterPanelModal({
  open,
  onClose,
  setSelectedFilters,
}: FilterPanelModalProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [stockCheckbox, setStockCheckbox] = useState(false);

  const filterOptions = [
    { title: "Renk", values: ["Siyah", "Beyaz", "Kırmızı", "Mavi", "Yeşil"] },
    { title: "Yıl", values: ["2025", "2024", "2023"] },
    { title: "Beden", values: ["S", "M", "L", "XL", "Std"] },
    { title: "Kategori", values: ["Elbise", "Gömlek", "Pantolon", "Ceket"] },
  ];

  const warehouseOptions = ["Merkez Depo", "İstanbul Depo", "Ankara Depo", "İzmir Depo"];

  const sortOptions = [
    { label: "Fiyat (Artan)", value: "price_asc" },
    { label: "Fiyat (Azalan)", value: "price_desc" },
    { label: "Yeni Ürünler", value: "newest" },
    { label: "Eski Ürünler", value: "oldest" },
  ];

  const addSelectedValue = (val: string) => {
    if (!selectedValues.includes(val)) {
      setSelectedValues((prev) => [...prev, val]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val !== "") addSelectedValue(val);
  };

  const handleSelectChange = (val: string) => {
    if (val !== "Seçiniz") addSelectedValue(val);
  };

  const clearFilters = () => {
    setSelectedValues([]);
    setStockCheckbox(false);
  };

  const applyFilters = () => {
    setSelectedFilters(selectedValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="relative z-50 bg-white w-full max-w-5xl rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-lg font-bold">Filtre Paneli</h2>
          <button onClick={onClose}><X size={20} /></button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Filters */}
          {filterOptions.map((filter, index) => (
            <div key={index}>
              <label className="block text-sm font-semibold mb-1">{filter.title}</label>
              <select
                className="w-full border p-2 rounded text-sm"
                onChange={(e) => handleSelectChange(e.target.value)}
              >
                <option>Seçiniz</option>
                {filter.values.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}

          {/* Stok */}
          <div>
            <label className="block text-sm font-semibold mb-1">Stok</label>
            <select
              className="w-full border p-2 rounded text-sm mb-2"
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option>Lütfen depo seçiniz</option>
              {warehouseOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <input
              className="w-full border p-2 rounded text-sm mb-2"
              type="number"
              placeholder="Minimum Stok"
              onBlur={handleInputChange}
            />
            <input
              className="w-full border p-2 rounded text-sm"
              type="number"
              placeholder="Maksimum Stok"
              onBlur={handleInputChange}
            />
          </div>

          {/* Ürün Kodu + Sıralama */}
          <div>
            <label className="block text-sm font-semibold mb-1">Ürün Kodu</label>
            <input
              type="text"
              className="w-full border p-2 rounded text-sm mb-2"
              placeholder="Seçiniz"
              onBlur={handleInputChange}
            />

            <label className="block text-sm font-semibold mb-1">Sıralamalar</label>
            <select
              className="w-full border p-2 rounded text-sm"
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option>Seçiniz</option>
              {sortOptions.map((s) => (
                <option key={s.value} value={s.label}>{s.label}</option>
              ))}
            </select>

            <div className="mt-3 flex items-center gap-2">
              <input
                type="checkbox"
                checked={stockCheckbox}
                onChange={() => {
                  setStockCheckbox(!stockCheckbox);
                  if (!stockCheckbox) addSelectedValue("Tüm Bedenlerinde Stok Olanlar");
                }}
              />
              <label className="text-sm">Tüm Bedenlerinde Stok Olanlar</label>
            </div>
          </div>
        </div>

        {/* Selected Criteria */}
        <div className="mt-6">
          <label className="block font-semibold mb-1">Uygulanan Kriterler</label>
          <div className="border h-24 p-2 rounded text-sm overflow-y-auto">
            {selectedValues.length > 0 ? (
              selectedValues.map((val, i) => <p key={i}>{val}</p>)
            ) : (
              <p className="text-gray-400">Lütfen aramak için kriter seçiniz</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button onClick={clearFilters} className="px-4 py-2 border rounded text-sm cursor-pointer">
            Seçimi Temizle
          </button>
          <button onClick={applyFilters} className="px-4 py-2 bg-gray-900 text-white rounded text-sm cursor-pointer">
            Ara
          </button>
        </div>
      </div>
    </Dialog>
  );
}
