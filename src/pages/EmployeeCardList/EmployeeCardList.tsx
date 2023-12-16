import { useSelector } from "react-redux";
import { IData, IEmployee } from "../../core/interfaces/interface.js";
import EmployeeCard from "../EmployeeCard/EmployeeCard.tsx";
import EmployeeCardListWrapper from "./employeeCardList.ts";
import Loader from "../../components/Loader/Loader.tsx";
import SearchBar from "../EmployeeListing/SearchAndFilter/components/SearchBar/SearchBar.tsx";
import Button from "../../components/Button/Button.tsx";
import Checkbox from "../../components/Checkbox/Checkbox.tsx";

function EmployeeCardList({ deleteCheckBoxesList,  employees,
    loading
   }: {
    deleteCheckBoxesList: {
        checkedBoxesList: string[];
        setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
    };
    employees:IEmployee[];
    loading:boolean  
}) {

    return (
      <>
      <div className="common-flex global-padding">
        <SearchBar placeholder="Search by name" />
        <Button>
          Select All
          <Checkbox
            deleteCheckBoxesList={deleteCheckBoxesList}
            employeesIdList={employees.map((employee) => employee.id)}
          />
        </Button>
      </div>
        <EmployeeCardListWrapper>
            {loading ? <Loader className="center-screen" /> :
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
        </>
    );
}
export default EmployeeCardList;
