import Button from "../Button/Button.tsx";
import ButtonGrpWrapper from "../Button/buttonGrpWrapper.ts";
import DeleteModalWrapper from "./../DeleteModal/deleteModal.ts";
import {
    DELETE_MODAL_HEADING,
    CONFIRM_DELETE_TEXT,
    WARNING_HEADING,
    WARNING_TEXT,
} from "./constants/constants.ts";

function DeleteModal({
    changeDltModalOpenStatus,
    employeeId,
}: {
    changeDltModalOpenStatus: () => void;
    employeeId: string;
}) {

    const confirmDlt = async () => {

        // TODO: Fetch the employee to delete
        // TODO: Deleting employee
        // TODO: Toast on sucess and error
        // TODO: Fetch again after deleting
        changeDltModalOpenStatus();
    };

    return (
        <DeleteModalWrapper>
            <Button
                icon="close"
                className="close-btn"
                onClick={changeDltModalOpenStatus}
            ></Button>
            <h2 className="delete-modal-heading">{DELETE_MODAL_HEADING}</h2>
            <p className="confirm-delete">{CONFIRM_DELETE_TEXT(employeeId)}</p>
            <div className="warning-container">
                <div className="warning-heading common-flex">
                    <span className="material-icons-round">warning</span>
                    <p className="title">{WARNING_HEADING}</p>
                </div>
                <p className="warning-text">{WARNING_TEXT}</p>
            </div>
            <ButtonGrpWrapper>
                <Button className="cancel-btn" onClick={changeDltModalOpenStatus}>
                    No, Cancel
                </Button>
                <Button className="delete-btn" icon="delete" onClick={confirmDlt}>
                    Yes, confirm delete
                </Button>
            </ButtonGrpWrapper>
        </DeleteModalWrapper>
    );
}
export default DeleteModal;
