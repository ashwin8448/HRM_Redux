import EmployeeViewWrapper from "./employeeView.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../components/Button/buttonGrpWrapper.ts";
import Loader from "../../components/Loader/Loader.tsx";
import { toast } from "react-toastify";
import { getData } from "../../core/api/functions.ts";
import EmployeeView from "./EmployeeView.tsx";
import { IAppEmployee } from "../../core/interfaces/interface.ts";
import { convertIGetEmployeeToIAppEmployee } from "../../utils/helper.ts";
import DeleteModal from "../../components/DeleteModal/DeleteModal.tsx";

function EmployeeViewLayout() {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState<{
    loading: Boolean;
    employee: IAppEmployee | null;
  }>({
    loading: true,
    employee: null,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!employeeId) {
      // Display error toast after initial render
      toast.error("No employee Id was provided", {
        toastId: "employee-not-found",
      });
      setEmployeeData({ ...employeeData, loading: false });
      navigate("/");
    } else {
      getData("/employee/" + employeeId)
        .then((response) => {
          if (!response.data) {
            //TODO: Handling errors
            throw new Response("Employee Not Found", { status: 404 });
          } else
            setEmployeeData((prev) => ({
              ...prev,
              employee: convertIGetEmployeeToIAppEmployee(response.data.data),
            }));
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() =>
          setEmployeeData((prev) => ({ ...prev, loading: false }))
        );
    }
  }, []);
  const handleDeleteButtonClick = () => {
    setDeleteModal(true);
  };
  if (employeeData.loading) return <Loader className="center-screen" />;
  return (
    employeeData.employee && (
      <>
        <span
          className="material-symbols-outlined back-btn"
          onClick={() => navigate(-1)}
        >
          {" "}
          reply
        </span>
        <EmployeeViewWrapper>
          <div>
            <div className="buttons">
              {" "}
              <ButtonGrpWrapper className="details-section common-flex">
                <Button
                  icon="edit"
                  onClick={() =>
                    navigate(`/edit-employee/${employeeData.employee!.id}`)
                  }
                />
                <Button
                  icon="delete"
                  onClick={() => handleDeleteButtonClick()}
                />
              </ButtonGrpWrapper>
            </div>
          </div>
          <EmployeeView employee={employeeData.employee}></EmployeeView>
        </EmployeeViewWrapper>
        {/* TODO:Delete employee from view page */}
        {/* {deleteModal && (
        <div className="overlay" onClick={handleDeleteButtonClick}></div>
      )}
      {deleteModal && (
        <DeleteModal
          changeDltModalOpenStatus={handleDeleteButtonClick}
          idArrayToDlt={[employeeData.employee.id]}
          handleActiveListing={handleActiveListing}
        />
      )} */}
      </>
    )
  );
}

export default EmployeeViewLayout;
