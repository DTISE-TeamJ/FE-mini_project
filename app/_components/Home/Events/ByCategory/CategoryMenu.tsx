<<<<<<< Updated upstream
// "use client";

=======
import React, { useEffect } from "react";
>>>>>>> Stashed changes
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  changeCategory,
  selectActiveCategory,
} from "@/store/action/category-slice";
<<<<<<< Updated upstream
import { useEffect } from "react";
=======
import { fetchMetadata } from "@/store/action/event-slice";
>>>>>>> Stashed changes

const CategoryMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
<<<<<<< Updated upstream
  const { events } = useAppSelector((state: RootState) => state.eventStore);

  const getCategory: string[] = Array.isArray(events)
    ? events.map((event) => event.eventCategory?.name || "Uncategorized")
    : [];

  const uniqueData = [...new Set(getCategory)];

  const menuCategories = ["All", ...uniqueData];
=======
  const { metadata } = useAppSelector((state: RootState) => state.eventStore);

  useEffect(() => {
    dispatch(fetchMetadata());
  }, [dispatch]);

  const menuCategories = ["All", ...metadata.categories];

  const handleCategoryClick = (category: string) => {
    dispatch(changeCategory(category));
  };
>>>>>>> Stashed changes

  return (
    <div className={`overflow-x-scroll whitespace-nowrap scrollbar-hide`}>
      <ul className="inline-flex space-x-4 py-4">
        {menuCategories.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer inline-block px-4 py-2 ${
              activeCategory === item ? "border-b-2 border-black" : ""
            }`}
<<<<<<< Updated upstream
            onClick={() =>
              dispatch(changeCategory({ category: item, events }))
            }>
=======
            onClick={() => handleCategoryClick(item)}>
>>>>>>> Stashed changes
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;