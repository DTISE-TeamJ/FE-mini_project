// SortMenu.tsx
import React, { useState, useRef, useEffect } from "react";

interface SortMenuProps {
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ selectedSort, setSelectedSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    setIsOpen(false);
  };

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case "price,asc":
        return "Price: Low to High";
      case "price,desc":
        return "Price: High to Low";
      default:
        return "Sort by price";
    }
  };

  return (
    <div className="relative w-full" ref={menuRef}>
      <div
        className="flex justify-between items-center border border-gray-400 p-2 rounded-xl cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{getSortLabel(selectedSort)}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="absolute border bg-white mt-1 w-full z-10 rounded-xl overflow-hidden">
          <ul>
            <li
              className="p-2 cursor-pointer hover:bg-cyan-300"
              onClick={() => handleSortSelect("")}
            >
              Sort by price
            </li>
            <li
              className="p-2 cursor-pointer hover:bg-cyan-300"
              onClick={() => handleSortSelect("price,asc")}
            >
              Price: Low to High
            </li>
            <li
              className="p-2 cursor-pointer hover:bg-cyan-300"
              onClick={() => handleSortSelect("price,desc")}
            >
              Price: High to Low
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortMenu;