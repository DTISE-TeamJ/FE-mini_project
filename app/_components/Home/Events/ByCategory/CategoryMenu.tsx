import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  changeCategory,
  selectActiveCategory,
} from "@/store/action/category-slice";
import { fetchEvents } from "@/store/action/event-slice";
import { useEffect } from "react";

const CategoryMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const { result } = useAppSelector((state: RootState) => state.eventStore);

  // useEffect(() => {
  //   dispatch(fetchEvents());
  // }, [dispatch]);

  const events = result || [];

  const getCategory = result?.map((event: any) => event?.eventCategory?.name);
  console.log(getCategory, "<===");

  const uniqueCategories = [...new Set(getCategory)];

  const menuCategories: React.ReactNode[] | any[] = [
    "All",
    ...uniqueCategories,
  ];

  const handleCategoryClick = (category: string) => {
    dispatch(changeCategory({ category, events }));
    // dispatch(changeCategory({ category, result }));
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
            onClick={() => handleCategoryClick(item as string)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
