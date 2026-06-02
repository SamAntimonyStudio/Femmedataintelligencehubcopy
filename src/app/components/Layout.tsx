import { Outlet } from "react-router";
import { FilterProvider, useFilters } from "../context/FilterContext";
import { Bell } from "lucide-react";
import Sidebar from "./Sidebar";


function LayoutContent() {
  return (
    <>
      <Sidebar />
      <div className="ml-[240px] min-h-screen flex flex-col bg-[var(--off-white)]" style={{ fontFamily: "var(--font-sans)" }}>
        {/* Main Content */}
        <main className="flex-1">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-[var(--green)] text-white/50 py-6 border-t border-[var(--border-color)]">
          <div className="px-12 flex justify-between items-center text-[12px]">
            <div style={{ fontFamily: "var(--font-serif)" }} className="text-[1.1rem] text-white/80">
              Femme Connection
            </div>
            <div>
              © 2026 Antimony Studio — Confidential Intelligence System
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default function Layout() {
  return (
    <FilterProvider>
      <LayoutContent />
    </FilterProvider>
  );
}