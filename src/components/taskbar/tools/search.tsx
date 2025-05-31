import { FC, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import TaskBarType from "../types/taskbar.type";



export const SearchInput: FC<TaskBarType["searchProps"]> = ({
  onSearch,
  placeholder = "Search...",
  className = "",
  debounceTime = 300,
  initialValue = "",
}) => {
  const [searchValue, setSearchValue] = useState(initialValue);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  const handleSearch = (value: string) => {
    setSearchValue(value);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceTime);

    setDebounceTimer(timer);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <SearchIcon className="absolute left-3 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-64 pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
