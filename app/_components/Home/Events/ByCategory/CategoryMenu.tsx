"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchMetadata } from '@/store/action/metadataSlice';

interface CategoryMenuProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ activeCategory, onCategoryChange }) => {
  const dispatch = useAppDispatch();
  const { data: metadata } = useAppSelector((state) => state.metadata);

  useEffect(() => {
    dispatch(fetchMetadata());
  }, [dispatch]);

  const menuCategories = ["All", ...(metadata?.categories || [])];

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="overflow-x-scroll whitespace-nowrap scrollbar-hide">
      <ul className="inline-flex space-x-4 py-4">
        {menuCategories.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer inline-block px-4 py-2 ${
              activeCategory === item ? "border-b-2 border-black" : ""
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;