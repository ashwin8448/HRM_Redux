import { useContext, useState } from "react";
import SearchWrapper from "./search.ts";
import { TableProps } from "../../../../../core/interfaces/interface.ts";
import DataContext from "../../../../../core/store/DataContext.tsx";

function SearchBar({placeholder}:{placeholder:string}) {

  const { addTableProps, tableProps } = useContext(DataContext);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleChange = ({ value }: { value: string }) => {
    let currentTableProps: TableProps = {
      ...tableProps,
      search_term: value,
    };
    addTableProps(currentTableProps);
  };

  return (
    <SearchWrapper $focus={focus} className="common-flex">
      <div id="searchForm" className="search-form common-flex">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          value={tableProps.search_term as string}
          className="search-input overflow-ellipsis"
          id="search-input"
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={(e) => {
            handleChange({ value: e.target.value });
          }}
          onBlur={handleBlur}
        />
      </div>
    </SearchWrapper>
  );
}
export default SearchBar;
