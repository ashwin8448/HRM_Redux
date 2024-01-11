export const DELETE_MODAL_HEADING = "Confirm user removal";

export const CONFIRM_DELETE_TEXT = (employeeIdList: string[]) =>
  `Are you sure you want to delete the following employee${
    employeeIdList.length > 1 ? "s" : ""
  } ?`;

export const WARNING_HEADING = "Warning";

export const WARNING_TEXT =
  "The data selected will be permanently removed. It would remove all the details related to the employee. Are you sure you want to continue?";