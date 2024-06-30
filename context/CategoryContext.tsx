"use client";

import { createContext, useContext, useState } from "react";

interface CategoryContextProps {
  activeCategory: string;
  changeCategory: (category: string) => void;
}

const CategoryContext = createContext<CategoryContextProps>({
  activeCategory: "All",
  changeCategory: () => {},
});

const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

const CategoryProvider = (props: any) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const changeCategory = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <CategoryContext.Provider value={{ activeCategory, changeCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
};

export { useCategoryContext, CategoryProvider };
