import { RootState, useAppDispatch, useAppSelector } from "@/store";
import {
  changeCategory,
  selectActiveCategory,
} from "@/store/action/category-slice";

const CategoryMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const { result } = useAppSelector((state: RootState) => state.eventStore);

  // console.log(result, "<===");

  const events = result?.content || [];

  // console.log(events);

  const getCategory = result.map((event: any) => event.eventCategory.name);
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

/*
const CategoryMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const { result } = useAppSelector((state: RootState) => state.eventStore);

  const data = result?.content;

  const getCategory: string[] = Array.isArray(data)
    ? data.map((event: any) => event.eventCategory?.name || "Uncategorized")
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
            onClick={() => dispatch(changeCategory({ category: item, data }))}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryMenu;
*/
