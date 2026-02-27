import React from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./Input";
import Button from "../ui/Button";

const Search = ({
  value,                    // ← নতুন: বাইরের state
  onChange,                 // ← নতুন: বাইরের setter
  onSearch,                 // optional: Enter / button press-এ কল করতে চাইলে
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  formClassName = "",
  iconClassName = "",
  containerClassName = "",
  showButton = false,
  buttonText = "Search",
  buttonClassName = "",
}) => {
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value?.trim?.() || "");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className={`w-full max-w-[50%] ${containerClassName}`}>
      <form onSubmit={handleSearch} className={`relative ${formClassName}`}>
        <FiSearch
          size={18}
          className={`text-(--muted-text) absolute left-4 top-1/2 transform -translate-y-1/2 ${iconClassName}`}
        />

        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder={placeholder}
            value={value || ""}               // ← controlled
            onChange={onChange}               // ← controlled
            onKeyPress={handleKeyPress}
            className={`w-full pl-12 ${inputClassName} ${className}`}
          />

          {showButton && (
            <Button type="submit" className={buttonClassName}>
              {buttonText}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;