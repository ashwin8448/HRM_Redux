import Button from "../../../components/Button/Button.tsx";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import { resetFiltersAndSearchBar } from "../../../utils/helper.ts";
import { ITableProps } from "../../../core/interfaces/interface.ts";
import FilterSelectList from "./components/FilterSelect/FilterSelectList.tsx";
import ActionsWrapper from "./actionsBar.ts";

function ActionsBar() {
    //TODO: fetch table props
    const onReset = () => {
        const resettedVals: ITableProps = {
            ...resetFiltersAndSearchBar(), // reset the select dropdowns + search bar
            //TODO: maintain sort props as it is and change should reflect on the all other fields according to the value
        };
        //TODO: fire a change to the filter prop
    };

    return (
        <>
            <ActionsWrapper className="common-flex m-30">
                <h2 className="subheading filter-title">Filter By:</h2>
                <div className="global-width common-flex form-flex-align">
                    <FilterSelectList />
                    <SearchBar placeholder="Search by name" />
                </div>
                <Button icon="" onClick={onReset}>
                    Clear
                </Button>
            </ActionsWrapper>
        </>
    );
}
export default ActionsBar;
