import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface CategoryMenuProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: metadata } = useSelector((state: RootState) => state.metadata);
  const categories = ["All categories", ...(metadata?.categories || [])];

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(search.toLowerCase())
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    } else {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === "All categories" ? "" : category);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={menuRef}>
      <div
        className="flex items-center justify-between border border-gray-400 p-2 rounded-xl cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedCategory || "All categories"}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="absolute bg-white mt-1 w-full z-10 rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-b p-2 w-full"
            ref={searchInputRef}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredCategories.map((category, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-cyan-300"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;