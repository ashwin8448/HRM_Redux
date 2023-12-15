import { useSelector } from "react-redux";
import ActiveChip from "../../components/ActiveChip/ActiveChip.js";
import Checkbox from "../../components/Checkbox/Checkbox.js";
import { IData, IEmployee } from "../../core/interfaces/interface.js";
import Loader from "../../components/Loader/Loader.js";
import EmployeeCardWrapper from "./employeeCard.js";
import { concatenateNames } from "../../utils/helper.js";

function EmployeeCard({ deleteCheckBoxesList, employee }: {
    deleteCheckBoxesList: {
        checkedBoxesList: string[];
        setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
    };
    employee: IEmployee
}) {

    return (
        <EmployeeCardWrapper >
            <div className="actions-section common-flex">
                <Checkbox employeeId={employee.id} deleteCheckBoxesList={deleteCheckBoxesList} />
                <ActiveChip isActive={employee.isActive ?? true}></ActiveChip>
            </div>
            <div className="title-section">
                <h2 className="employee-name">{concatenateNames(employee.firstName, employee.lastName ? employee.lastName : "")}</h2>
                <h3 className="employee-designation">{employee.designation??"-"}</h3>
            </div>
            <div className="details-section common-flex">
                <div className="department">
                    <p className="subheading employee-name">Department</p>
                    <h3 className="employee-department">{employee.department?.department ?? "-"}</h3>
                </div>
                <div className="dateOfJoining">
                    <p className="subheading employee-name">Date of Joining</p>
                    <h3 className="employee-department">{employee.dateOfJoining ?? "-"}</h3>
                </div>
            </div>
        </EmployeeCardWrapper>
    );
}
export default EmployeeCard;
