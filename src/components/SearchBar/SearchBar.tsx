import { useEffect, useState } from "react";
import SearchWrapper from "./search.ts";
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../../utils/helper.ts";
import { debounceTimeout, defaultPageSize, listDisplay } from "../../core/config/constants.ts";

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
  };



  useEffect(() => {
    const changeSearchParams = () => {
      const displayValue = searchParams.get("display");
      const commonParams = {
        search: searchState || undefined,
        page: displayValue === listDisplay ? defaultPageSize.page : undefined,
      };

      updateSearchParams(setSearchParams, searchParams, commonParams);
    }
    const timeOut = setTimeout(changeSearchParams, debounceTimeout);
    return () => clearTimeout(timeOut);
  }, [searchParams, searchState, setSearchParams])


  return (
    <SearchWrapper $focus={focus}>
      <div id="searchForm" className="search-form common-flex">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          value={searchState}
          className="search-input overflow-ellipsis"
          id="search-input"
          placeholder="Search by Name"
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
