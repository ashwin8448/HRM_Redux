import { useEffect } from "react";
import { IAppEmployee } from "../../../../core/interfaces/interface.ts";
import TableWrapper from "./employeeTable.ts";
import Loader from "../../../../components/Loader/Loader.tsx";
import { fetchEmployeesData } from "../../../../core/store/actions.ts";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/reduxHooks.ts";
import { updateSearchParams } from "../../../../utils/helper.ts";
import Pagination from "../components/Pagination/Pagination.tsx";
import TableData from "../components/TableData/TableData.tsx";
import TableHead from "../components/TableHead/TableHead.tsx";
import { defaultPageSize, defaultSortBy, defaultSortDir, listDisplay, recordsPerPage } from "../../../../core/config/constants.ts";

function EmployeeTable({
  deleteCheckBoxesList,
  employees,
  loading,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IAppEmployee[];
  loading: boolean;
}) {
  const dispatch = useAppDispatch();

  // Employee fetching
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      fetchEmployeesData(
        {
          limit: recordsPerPage,
          offset: (Number(searchParams.get("page") || "1") - 1) * recordsPerPage,
          sortBy: searchParams.get("sortBy") || defaultSortBy,
          sortDir: searchParams.get("sortDir") || defaultSortDir,
          search: searchParams.get("search") || "",
          skillIds: searchParams.get("skillIds") || "",
        },
        listDisplay
      )
    );
  }, [searchParams, recordsPerPage]);

  useEffect(() => {
    updateSearchParams(setSearchParams, searchParams, defaultPageSize);
  }, []);

  return (
    <>
      <div className="table-overflow-scroll">
        <TableWrapper>
          <TableHead
            deleteCheckBoxesList={deleteCheckBoxesList}
            employees={employees}
          />
          {loading ? (
            <tbody>
              <tr className="no-border-row">
                <td colSpan={5}>
                  {/* This component is rendered when data is fetching from database  */}
                  <div className="loader-container">
                    <Loader className="table-loader" />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee: IAppEmployee, index: number) => {
                  return (
                    employee && (
                      <TableData
                        key={employee.id}
                        employee={employee}
                        index={index}
                        deleteCheckBoxesList={deleteCheckBoxesList}
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
      <Pagination
        deleteCheckBoxesList={deleteCheckBoxesList}
      />
    </>
  );
}
export default EmployeeTable;
