import React, { useCallback, useEffect, useRef } from 'react';
import EmployeeCard from '../components/EmployeeCard.tsx';
import Loader from '../../../../components/Loader/loader.ts';
import {
  fetchEmployeesData,
  resetEmployeesGrid,
} from '../../../../core/store/actions.ts';
import EmployeeCardListWrapper from './employeeCardList.ts';
import { useSearchParams } from 'react-router-dom';
import { IAppEmployee } from '../../../../core/interfaces/interface.ts';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../hooks/reduxHooks.ts';
import {
  defaultSortBy,
  defaultSortDir,
  recordsPerPage,
} from '../../../../core/config/constants.ts';
import { gridDisplay } from './../../../../core/config/constants';

function EmployeeCardList({
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
  // Employees count fetching
  const { count } = useAppSelector((state) => state.employeesData);

  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const bottomObserver = useRef<IntersectionObserver | null>(null);
  const bottomElement = useRef<HTMLDivElement>(null);

  const hasMore = count !== null ? employees.length < count : true;

  useEffect(() => {
    dispatch(resetEmployeesGrid());
  }, [dispatch, searchParams]);

  const loadData = useCallback(async () => {
    if (hasMore && !loading) {
      const offset = employees.length;
      dispatch(
        fetchEmployeesData(
          {
            limit: recordsPerPage,
            offset: offset,
            sortBy: searchParams.get('sortBy') || defaultSortBy,
            sortDir: searchParams.get('sortDir') || defaultSortDir,
            search: searchParams.get('search') || '',
            skillIds: searchParams.get('skillIds') || '',
          },
          gridDisplay
        )
      );
    }
  }, [dispatch, employees.length, hasMore, loading, searchParams]);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        loadData();
      }
    };
    bottomObserver.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    });
    if (bottomElement.current) {
      bottomObserver.current.observe(bottomElement.current);
    }

    return () => {
      if (bottomObserver.current) {
        bottomObserver.current.disconnect();
      }
    };
  }, [dispatch, loadData]);

  return (
    <>
      {employees.length > 0 ? (
        <EmployeeCardListWrapper>
          {
            employees.map(
              (employee: IAppEmployee) =>
                employee && (
                  <EmployeeCard
                    key={employee.id}
                    deleteCheckBoxesList={deleteCheckBoxesList}
                    employee={employee}
                  />
                )
            )
          }
        </EmployeeCardListWrapper>
      ) : (
        <div className="no-data">
          {!loading ? 'No data available' : null}
        </div>
      )}
      {loading && (
        <div className="infinite-scroll-loader-div">
          <Loader className="infinite-scroll-loader common-flex" />
        </div>
      )}
      <div ref={bottomElement} style={{ height: '10px' }} />
      {/* This div is observed for intersection */}
    </>
  );
}

export default EmployeeCardList;
