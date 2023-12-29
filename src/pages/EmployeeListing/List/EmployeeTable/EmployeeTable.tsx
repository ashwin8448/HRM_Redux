import { useEffect } from "react";
import { IReceivingEmployee } from "../../../../core/interfaces/interface.ts";
import TableWrapper from "./employeeTable.ts";
import TableHead from "../EmployeeTable/TableComponents/TableHead/TableHead.tsx";
import Loader from "../../../../components/Loader/Loader.tsx";
import { fetchEmployeesData } from "../../../../core/store/actions.ts";
import store from "../../../../core/store/configureStore.ts";
import React from "react";
import Pagination from "../../../../components/Pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";
import TableData from "./TableComponents/TableData/TableData.tsx";

function EmployeeTable({
  deleteCheckBoxesList,
  employees,
  loading,
  rowsPerPage,
  totalPages,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employees: IReceivingEmployee[];
  loading: boolean;
  rowsPerPage: number;
  totalPages: number;
}) {
  // Employee fetching
  const [searchParams, setSearchParams] = useSearchParams();
  const updateSearchParams = (params: { page?: string }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  useEffect(() => {
    store.dispatch(
      fetchEmployeesData(
        {
          limit: rowsPerPage,
          offset: (Number(searchParams.get("page") || "1") - 1) * rowsPerPage,
          sortBy: searchParams.get("sortBy") || "id",
          sortDir: searchParams.get("sortDir") || "asc",
          search: searchParams.get("search") || "",
          skillIds: searchParams.get("skillIds") || "",
        },
        "List"
      )
    );
  }, [searchParams, rowsPerPage]);

  useEffect(() => {
    updateSearchParams({ page: "1" });
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
                employees.map((employee: IReceivingEmployee, index: number) => {
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
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
      />
    </>
  );
}
export default EmployeeTable;
