import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import fetchData from "../../utils/fetchData.ts";
import MainHeading from "./MainHeading/MainHeading.tsx";

function EmployeeListing() {

    const data = fetchData();
    console.log(data)
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={1}
                closeOnClick
                pauseOnFocusLoss={false} // avoid pausing when the window looses the focus
            />
            <MainHeading />
        </>
    );
}
export default EmployeeListing;
