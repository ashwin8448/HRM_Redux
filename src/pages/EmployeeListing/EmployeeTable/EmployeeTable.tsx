import { useContext, useEffect, useMemo, useState } from "react";
import { IData, IEmployee } from "../../../core/interfaces/interface.ts";
import TableWrapper from "./employeeTable.ts";
import TableData from "./TableData/TableData.tsx";
import TableHead from "./TableHead/TableHead.tsx";
import Loader from "../../../components/Loader/Loader.tsx";
import { filterData, searchData, sortData } from "../../../utils/helper.ts";
import DeleteModal from "../../../components/DeleteModal/DeleteModal.tsx";
import { fetchEmployeesData } from "../../../core/store/actions.ts";
import store from "../../../core/store/configureStore.ts";
import { useSelector } from "react-redux";

let pageSize = 5;

function EmployeeTable({
    deleteModal,
    changeDltModalOpenStatus,
}: {
    deleteModal: boolean;
    changeDltModalOpenStatus: () => void;
}) {
    const employeesData = useSelector((state: IData) => state.employeesData)
    const employees = employeesData.employees;
    const loading = employeesData.loading;

    useEffect(() => {
        store.dispatch(fetchEmployeesData())
    }, [])

    //TODO: Fetch employees data, loading, filterprops

    const [idToDlt, setIdToDlt] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    let totalCount = 0;
    let totalPageCount = 0;

    const employeesTableView = useMemo(() => {
        //TODO: if employees list is null
        // if (!employees) {
        //     return [];
        // }

        //TODO: sorting,filtering and searching
        // const sortedEmployees = sortData(dataEmployees, tableProps);
        // const filteredEmployees = filterData(sortedEmployees, tableProps);
        // const searchedEmployees = searchData(filteredEmployees, tableProps);

        const searchedEmployees = employeesData.employees;
        // Update totalCount based on the filtered data length
        // totalCount = searchedEmployees.length;

        // // Calculate the total number of pages based on the filtered data length
        // totalPageCount = Math.ceil(totalCount / pageSize);

        // // Ensure that the current page is within the valid range
        // const validCurrentPage = Math.min(currentPage, totalPageCount);

        // const firstPageIndex = (validCurrentPage - 1) * pageSize;
        // const lastPageIndex = firstPageIndex + pageSize;

        return searchedEmployees
        // .slice(firstPageIndex, lastPageIndex);
    }, [
        // tableProps, employees,
        currentPage, deleteModal
    ]);

    const addIdToDlt = (idToDlt: string) => {
        setIdToDlt(idToDlt);
    };
    const idToDltProp = { idToDlt, addIdToDlt };

    return (
        <>
            <div className="table-overflow-scroll">
                <TableWrapper>
                    <TableHead />
                    {loading ? ( //TODO: replace with loading
                        <tbody>
                            <tr className="no-border-row">
                                <td colSpan={5}>
                                    {/* This component is rendered when data is fetching from database  */}
                                    <div className="loader-container">
                                        <Loader />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee: IEmployee, index: number) => {
                                    return (
                                        employee && (
                                            <TableData
                                                key={employee.id}
                                                employee={employee}
                                                index={index}
                                                changeDltModalOpenStatus={changeDltModalOpenStatus}
                                                idToDltProp={idToDltProp}
                                            />
                                        )
                                    );
                                })
                            ) : (
                                <tr>
                                    <td className="no-data" colSpan={6}>
                                        No data Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    )}
                </TableWrapper>
            </div>
            {deleteModal && (
                <DeleteModal
                    changeDltModalOpenStatus={changeDltModalOpenStatus}
                    employeeId={idToDlt}
                />
            )}
            {/* TODO:Pagination  */}
            {/* <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalPageCount={totalPageCount}
                pageSize={pageSize}
                onPageChange={(page: number) => setCurrentPage(page)}
            /> */}
        </>
    );
}
export default EmployeeTable;
