"use client"
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { FiPackage, FiLayers } from "react-icons/fi";
import Link from "next/link";



const Sidebar = () => {

    // Get the current pathname for the active link 
    const pathName = usePathname();

  return  (
    <aside className="w-60 h-full  rounded-2xl bg-white shadow-sm p-4">
      <nav className="space-y-2 p-2">
        <h3 className="text-xl  text-gray-500">Menü</h3>
          <Link
            
            href="/dashboard"
            className={`flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-200 rounded-md ${
                pathName === "/dashboard" ? "bg-gray-200" : ""}`}
          >
            <AiOutlineHome className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            
            href="/products"
            className={`flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-200 rounded-md ${
                pathName === "/products" ? "bg-gray-200" : ""}`}
          >
            <FiPackage className="w-5 h-5" />
            Ürünler
          </Link>
          <h3 className="text-xl mt-4 text-gray-500">Satış</h3>
          <Link
            
            href="/collections"
            className={`flex items-center gap-3 px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-200 rounded-md ${
                pathName === "/collections" ? "bg-gray-200" : ""}`}
          >
            <FiLayers className="w-5 h-5" />
            Koleksiyon
          </Link>
      
      </nav>
    </aside>
  );

  } 


  export default Sidebar;