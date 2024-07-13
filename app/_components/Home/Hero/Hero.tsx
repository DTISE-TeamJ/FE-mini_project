"use client";

import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchEvents, searchEvents } from "@/store/action/event-slice";
import { selectActiveCategory } from "@/store/action/category-slice";

interface SearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Hero: React.FC<SearchProps> = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    setSearchTerm(searchInput.trim());
  }, [searchInput, setSearchTerm]);

  return (
    <div className="w-full h-screen relative">
      <video
        className="w-full h-full object-cover"
        src="/beachVid.mp4"
        autoPlay
        muted
        loop
        preload="auto"
      />
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
        <h1>First Class Travel</h1>
        <h2 className="py-4">Top 1% Locations Worldwide</h2>
        <form className="flex justify-between items-center max-w-[700px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/90">
          <div>
            <input
              className="bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none"
              type="text"
              placeholder="Search Event"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <AiOutlineSearch
              size={20}
              className="icon text-[#b9baba] cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;

/*
import React, { useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDebounce } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchEvents, searchEvents } from "@/store/action/event-slice";
import { selectActiveCategory } from "@/store/action/category-slice";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Hero: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(searchEvents(debouncedSearchTerm));
    } else {
      dispatch(fetchEvents());
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className="w-full h-screen relative">
      <video
        className="w-full h-full object-cover"
        src="/beachVid.mp4"
        autoPlay
        muted
        loop
        preload="auto"
      />
      <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
      <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
        <h1>First Class Travel</h1>
        <h2 className="py-4">Top 1% Locations Worldwide</h2>
        <form className="flex justify-between items-center max-w-[700px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/90">
          <div>
            <input
              className="bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none"
              type="text"
              placeholder="Search Event"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <AiOutlineSearch
              size={20}
              className="icon text-[#b9baba] cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
*/

/*
// import React, { useEffect } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import { useDebounce } from "use-debounce";
// import { useAppDispatch } from "@/store";
// import { fetchEvents, searchEvents } from "@/store/action/event-slice";

// interface SearchProps {
//   searchTerm: string;
//   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
// }

// const Hero: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
//   const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
//   const dispatch = useAppDispatch();

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       dispatch(searchEvents(debouncedSearchTerm));
//     } else {
//       dispatch(fetchEvents());
//     }
//   }, [debouncedSearchTerm, dispatch]);

//   return (
//     <div className="w-full h-screen relative">
//       <video
//         className="w-full h-full object-cover"
//         src="/beachVid.mp4"
//         autoPlay
//         muted
//         loop
//         preload="auto"
//       />
//       <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30"></div>
//       <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
//         <h1>First Class Travel</h1>
//         <h2 className="py-4">Top 1% Locations Worldwide</h2>
//         <form className="flex justify-between items-center max-w-[700px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/90">
//           <div>
//             <input
//               className="bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none"
//               type="text"
//               placeholder="Search Event"
//               value={searchTerm}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div>
//             <AiOutlineSearch
//               size={20}
//               className="icon text-[#b9baba] cursor-pointer"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Hero;
*/
