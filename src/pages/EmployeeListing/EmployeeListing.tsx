import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeTableSearchAndPagination from './EmployeeTableSearchAndPagination/EmployeeTableSearchAndPagination.tsx';
import StyledLink from '../../components/StyledLink.ts';
import Button from '../../components/Button/Button.tsx';
import { useMediaQuery } from 'usehooks-ts';
import ButtonGrpWrapper from './../../components/Button/buttonGrpWrapper';
import EmployeeTableActions from './EmployeeTableActions/EmployeeTableActions.tsx';
import { useEffect, useState } from 'react';
import SideFilterBar from './SideFilterBar/SideFilterBar.tsx';
import EmployeeCardList from '../EmployeeCardList/EmployeeCardList.tsx';
import { useSelector } from 'react-redux';
import { IData, IEmployee } from '../../core/interfaces/interface.ts';
import SearchBar from './SearchAndFilter/components/SearchBar/SearchBar.tsx';
import Checkbox from '../../components/Checkbox/Checkbox.tsx';
import { useSearchParams } from 'react-router-dom';

function EmployeeListing() {
  const matches = useMediaQuery('(min-width: 768px)');
  const [isSideFilterBarVisible, setSideFilterBarVisible] = useState(false);

  const handleButtonClick = () => {
    setSideFilterBarVisible(!isSideFilterBarVisible);
  };
  const [checkedBoxesList, setCheckedBoxesList] = useState<string[]>([]);
  const deleteCheckBoxesList = { checkedBoxesList, setCheckedBoxesList };

  const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close

  const changeDltModalOpenStatus = () => {
    console.log();
    setDeleteModal(
      () => deleteCheckBoxesList.checkedBoxesList.length !== 0 && !deleteModal
    );
  };

  const [listingActive, setListingActive] = useState('List');
  const handleActiveListing = (buttonTxt: string) => {
    setListingActive(buttonTxt);
  };

  // Employees data fetching
  const { employees, loading, count } = useSelector(
    (state: IData) => state.employeesData
  );

  useEffect(() => {
    deleteModal
      ? (document.body.style.overflow = 'hidden') // Disable scrolling
      : (document.body.style.overflow = 'auto'); // Enable scrolling

    // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [deleteModal]);

  // Select all
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const changeBtnText = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = (params: {
    page?: string;
    search?: string,
  }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  const search = searchParams.get("search")??"";
  const [searchState, setSearchState] = useState(search);
  const searchValue = { searchState, setSearchState }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        closeOnClick
        pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
      />
      {/* include searching filtering techniques */}
      {/* <ActionsBar /> */}
      <ButtonGrpWrapper>
        <Button icon="filter_list" onClick={handleButtonClick}>
          {matches ? 'All filters' : ''}
        </Button>
        <StyledLink to="add-employee">
          <Button icon="add_circle">{matches ? 'Add New Employee' : ''}</Button>
        </StyledLink>
      </ButtonGrpWrapper>
      {isSideFilterBarVisible && (
        <SideFilterBar
          isVisible={isSideFilterBarVisible}
          onClick={handleButtonClick}
        />
      )}
      {isSideFilterBarVisible && (
        <div
          className="overlay"
          onClick={() => setSideFilterBarVisible(false)}
        ></div>
      )}
      <EmployeeTableActions
        listingActive={listingActive}
        handleActiveListing={handleActiveListing}
        deleteCheckBoxesList={deleteCheckBoxesList}
        deleteModal={deleteModal}
        changeDltModalOpenStatus={changeDltModalOpenStatus}
      />
      <div className="common-flex global-padding">
        <SearchBar placeholder="Search by name" value={searchValue} updateSearchParams={updateSearchParams} />
        {/* <PaginationResults
              updateSearchParams={updateSearchParams}
              totalPages={totalPages}
            ></PaginationResults> */}
        {!loading && listingActive === 'List' && (
          `Showing ${employees.length} of ${count} results`
        )}
        {!loading && listingActive === 'Grid' && (
          <Button className="select-all" onClick={changeBtnText}>
            {selectAll ? 'Select All' : 'Unselect All'}
            <Checkbox
              deleteCheckBoxesList={deleteCheckBoxesList}
              employeesIdList={employees.map((employee) => employee.id)}
            />
          </Button>
        )}
      </div>
      {listingActive == 'List' ? (
        <EmployeeTableSearchAndPagination
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
          employeesCount={count}
        />
      ) : (
        <EmployeeCardList
          deleteCheckBoxesList={deleteCheckBoxesList}
          employees={employees}
          loading={loading}
          employeesCount={count}
        />
      )}
    </>
  );
}
export default EmployeeListing;
