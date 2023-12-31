import { useState } from "react";
import SearchWrapper from "./search.ts";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchState, setSearchState] = useState(
    searchParams.get("search") ?? ""
  );
  const [focus, setFocus] = useState(false);

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleChange = ({ searchedTxt }: { searchedTxt: string }) => {
    setSearchState(searchedTxt);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...{ search: searchedTxt, page: "1" },
    });
  };

  return (
    <SearchWrapper $focus={focus} >
      <div id="searchForm" className="search-form common-flex">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          value={searchState}
          className="search-input overflow-ellipsis"
          id="search-input"
          placeholder="Search by First Name"
          onFocus={handleFocus}
          onChange={(e) => {
            handleChange({ searchedTxt: e.target.value });
          }}
          onBlur={handleBlur}
        />
      </div>
    </SearchWrapper>
  );
}
export default SearchBar;
