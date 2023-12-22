import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import MainHeading from "./MainHeading/MainHeading.tsx";
import ActionsBar from "./SearchAndFilter/ActionsBar.tsx";
import EmployeeTable from "./EmployeeTable/EmployeeTable.tsx";

function EmployeeListing() {

    const [deleteModal, setDeleteModal] = useState(false); // determines whether the modal is open or close

    const changeDltModalOpenStatus = () => {
        setDeleteModal(() => !deleteModal);
    };

    useEffect(() => {
        deleteModal
            ? (document.body.style.overflow = "hidden") // Disable scrolling
            : (document.body.style.overflow = "auto"); // Enable scrolling

        // Cleanup function to re-enable scrolling when the component unmounts or when the modal is closed
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [deleteModal]);

    return (
        <>

            <MainHeading />
            {/* include searching filtering techniques */}
            <ActionsBar />
            <EmployeeTable
                deleteModal={deleteModal}
                changeDltModalOpenStatus={changeDltModalOpenStatus}
            />
            {deleteModal && <div className="overlay" onClick={() => setDeleteModal(false)}></div>}

        </>
    );
}
export default EmployeeListing;
