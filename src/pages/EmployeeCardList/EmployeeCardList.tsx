import { useSelector } from "react-redux";
import ActiveChip from "../../components/ActiveChip/ActiveChip.js";
import Checkbox from "../../components/Checkbox/Checkbox.js";
import { IData, IEmployee } from "../../core/interfaces/interface.js";
import Loader from "../../components/Loader/Loader.js";
import EmployeeCard from "../EmployeeCard/EmployeeCard.tsx";
import EmployeeCardListWrapper from "./employeeCardList.ts";

function EmployeeCardList({ deleteCheckBoxesList }: {
    deleteCheckBoxesList: {
        checkedBoxesList: string[];
        setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
    };
}) {
    const employeesData = useSelector((state: IData) => state.employeesData);
    const employees: IEmployee[] = employeesData.employees;
    const loading = employeesData.loading;

    return (
        <EmployeeCardListWrapper>
            {loading ? <Loader /> :
                employees.length > 0 ?
                    employees.map((employee: IEmployee) => {
                        return (
                            employee && (
                                <EmployeeCard key={employee.id} deleteCheckBoxesList={deleteCheckBoxesList} employee={employee} />
                            )
                        );
                    })
                    : (
                        <div className="common-flex">
                            No data Available
                        </div>
                    )}
        </EmployeeCardListWrapper>
    );
}
export default EmployeeCardList;
