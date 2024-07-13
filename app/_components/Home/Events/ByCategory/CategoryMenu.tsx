// "use client";

import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  changeCategory,
  selectActiveCategory,
} from "@/store/action/category-slice";
import { useEffect } from "react";

const CategoryMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const { events } = useAppSelector((state: RootState) => state.eventStore);

  const getCategory: string[] = Array.isArray(events)
    ? events.map((event) => event.eventCategory?.name || "Uncategorized")
    : [];

  const uniqueData = [...new Set(getCategory)];

  const menuCategories = ["All", ...uniqueData];

  return (
    <div className={`overflow-x-scroll whitespace-nowrap scrollbar-hide`}>
      <ul className="inline-flex space-x-4 py-4">
        {menuCategories.map((item, index) => (
          <li
            key={index}
            className={`cursor-pointer inline-block px-4 py-2 ${
              activeCategory === item ? "border-b-2 border-black" : ""
            }`}
            onClick={() =>
              dispatch(changeCategory({ category: item, events }))
            }>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
