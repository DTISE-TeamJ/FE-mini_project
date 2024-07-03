"use client"

import { useCategoryContext } from "@/context/CategoryContext";

export default function CategoryMenu() {
  const { activeCategory, changeCategory } = useCategoryContext();

  const categories = ["Music", "Sports", "Education", "Health"];

  const menuCategories = ["All", ...categories];

  return (
    <>
      <div className={`overflow-x-scroll whitespace-nowrap scrollbar-hide`}>
        {" "}
        <ul className="inline-flex space-x-4 py-4">
          {menuCategories.map((item) => (
            <li
              key={item}
              className={`cursor-pointer inline-block px-4 py-2 ${
                activeCategory === item ? "border-b-2 border-black" : ""
              }`}
              onClick={() => changeCategory(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
