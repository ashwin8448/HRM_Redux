import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.tsx";
import { toast } from "react-toastify";
import { getData } from "../../core/api/functions.ts";
import { IAppEmployee } from "../../core/interfaces/interface.ts";
import { convertIGetEmployeeToIAppEmployee } from "../../utils/helper.ts";
import EmployeeView from "./EmployeeView.tsx";
import Button from "../../components/Button/Button.tsx";

function EmployeeViewLayout() {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState<{
    loading: boolean;
    employee: IAppEmployee | null;
  }>({
    loading: true,
    employee: null,
  });

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

  const { loading, employee } = employeeData;

  if (loading)
    return (
      <div className="center-loader">
        <Loader />
      </div>
    );
  return (
    employee && (
      <>
        <Button
          className="material-symbols-outlined back-btn"
          icon="reply"
          onClick={() => navigate(-1)}
        ></Button>
        <EmployeeView employee={employee} />
      </>
    )
  );
}

export default EmployeeViewLayout;
