import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./navigation/nav";
import Products from "./products/product";
import Sidebar from "./sidebar/sidebar";
import Recommend from "./recommended/recommend";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./components/Checkout"; // <-- import Checkout page
import type { FilterState } from "./types/filter";
import Wishlist from "./components/Wishlist";

function App() {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    priceRange: "All",
    color: "All",
    brand: "All",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CartProvider>
      <Router>
        <div className="bg-gray-50 lg:flex">
          <Sidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            isOpen={sidebarOpen}
            setIsOpen={setSidebarOpen}
          />

          <div className="flex-1 flex flex-col h-screen overflow-auto">
            <Nav
              setIsOpen={setSidebarOpen}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <main className="flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Recommend
                        selectedBrand={filters.brand}
                        onBrandChange={(brand) => handleFilterChange("brand", brand)}
                      />
                      <Products searchTerm={searchTerm} filters={filters} />
                    </>
                  }
                />
                <Route path="/checkout" element={<Checkout onClose={() => {}} />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Routes>
            </main>
          </div>

          {/* Cart sidebar */}
          <CartSidebar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
