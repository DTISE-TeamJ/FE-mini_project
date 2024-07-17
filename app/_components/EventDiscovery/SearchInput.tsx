import React from "react";

interface SearchInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ keyword, setKeyword }) => {
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search events..."
        value={keyword}
        onChange={handleKeywordChange}
        className="w-full p-2 border border-gray-400 rounded-xl bg-white"
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-3"></span>
    </div>
  );
};

export default SearchInput;
