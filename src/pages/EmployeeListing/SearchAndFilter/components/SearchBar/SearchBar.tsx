import { useContext, useState } from "react";
import SearchWrapper from "./search.ts";

function SearchBar({ placeholder, value, updateSearchParams }: {
    placeholder: string;
    value: {
        searchState: string;
        setSearchState: React.Dispatch<React.SetStateAction<string>>;
    };
    updateSearchParams: (params: {
        page?: string | undefined;
        search?: string | undefined;
    }) => void
}) {

    // const { addTableProps, tableProps } = useContext(DataContext);
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const handleChange = ({ searchedTxt }: { searchedTxt: string }) => {
        value.setSearchState(() => searchedTxt);
        updateSearchParams({ search: searchedTxt, page: "1" })
    };

    return (
        <SearchWrapper $focus={focus} className="common-flex">
            <div id="searchForm" className="search-form common-flex">
                <span className="material-symbols-outlined search-icon">search</span>
                <input
                    type="text"
                    value={value.searchState}
                    className="search-input overflow-ellipsis"
                    id="search-input"
                    placeholder={placeholder}
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
