import React from "react";
import { categories, prices,colors } from "../db/data";

export interface FilterState {
  category: string;
  priceRange: string;
  color: string;
}

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange, isOpen, setIsOpen }) => {
  
  return (
    <>
      {/* Sidebar */}
      <aside
         className={`sidebar-scroll fixed top-0 left-0 h-screen w-80 sm:w-72 bg-white shadow-2xl border-r border-gray-200 z-40
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative lg:w-64 xl:w-72 2xl:w-80
          lg:shadow-none lg:border-r-2 lg:border-gray-100
          overflow-y-auto
          ${isOpen ? "backdrop-blur-lg" : ""}`}
        style={isOpen ? { backdropFilter: "blur(16px)" } : {}}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 font-lato">Filters</h2>
            <button
              className="lg:hidden p-1 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close filters"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filter content */}
        <div className="p-6 space-y-8">
          {/* Category */}
          <div className="space-y-4">
            <h3 className="text-lg font-epunda font-semibold text-gray-900 flex items-center gap-2">
              Category
            </h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <label
                  key={c}
                  className="flex font-epunda items-center cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    checked={filters.category === c}
                    onChange={() => onFilterChange("category", c)}
                    type="radio"
                    name="category"
                    className="w-4 h-4 font-epunda text-blue-600 border-2 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-3 font-epunda text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                    {c}
                  </span>
                  {filters.category === c && <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="text-lg font-epunda font-semibold text-gray-900 flex items-center gap-2">
              Price Range
            </h3>
            <div className="space-y-2">
              {prices.map((p) => (
                <label
                  key={p}
                  className="flex font-lato items-center cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    checked={filters.priceRange === p}
                    onChange={() => onFilterChange("priceRange", p)}
                    type="radio"
                    name="price"
                    className="w-4 h-4 text-green-600 border-2 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <span className="ml-3  text-gray-700 group-hover:text-gray-900 transition-colors font-medium">
                    {p}
                  </span>
                  {filters.priceRange === p && <span className="ml-auto w-2 h-2 bg-green-600 rounded-full"></span>}
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-epunda font-semibold text-gray-900 flex items-center gap-2">
              Colors
            </h3>
            <div className="space-y-2">
              {colors.map((color) => (
                <label
                  key={color.name}
                  className="flex font-epunda items-center cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    checked={filters.color === color.name}
                    onChange={() => onFilterChange("color", color.name)}
                    type="radio"
                    name="color"
                    className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors font-medium flex items-center gap-2">
                    <span
                      className="inline-block w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    {color.name}
                  </span>
                  {filters.color === color.name && <span className="ml-auto w-2 h-2 bg-purple-600 rounded-full"></span>}
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onFilterChange("category", "All");
                onFilterChange("priceRange", "All");
                onFilterChange("color", "All");
              }}
              className="w-full font-epunda px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed top-0 inset-0  bg-opacity-50 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
