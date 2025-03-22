
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-gray-50 pt-4 pr-2 gap-8">
      <div className="flex flex-col w-60 ">
        <div className="text-4xl font-bold mb-10 mt-8 text-center">LOGO</div>
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutShell;
