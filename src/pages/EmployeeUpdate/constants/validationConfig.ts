const currentDate = new Date().toISOString().split("T")[0];

export const nameValidation = {
  pattern: {
    value: /^[A-Za-z ]*[A-Za-z][A-Za-z ]*$/,
    message: "This is an invalid value",
  },
  minLength: {
    value: 2,
    message: "min 2 characters",
  },
  maxLength: {
    value: 20,
    message: "max 20 characters",
  },
};

export const emailValidation = {
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'This is an invalid value',
  },
};

export const phoneValidation = {
  pattern: {
    value: /^[0-9]{10}$/,
    message: "Phone number must be 10 digits with no alphabets.",
  },
};

export const addressValidation = {
  minLength: {
    value: 2,
    message: "min 2 characters",
  },
};

export const dateValidation = {
  max: {
    value: currentDate,
    message: "This is an invalid value",
  },
};

export const numberValidation = {
  pattern: {
    value: /^\d+$/,
    message: "Please enter a valid number.",
  },
};

export const passwordValidation = {
  pattern: {
    value: /^(?=.*[0-9].*[0-9])(?=.*[a-zA-Z].*[a-zA-Z]).{4,}$/,
    message: "Please enter a valid password.",
  },
};

export const confirmPasswordValidation = {
  validate: (value: string, { password }: { password: string }) => {
    if (value === password) {
      return true;
    } else {
      return "Passwords do not match";
    }
  },
};
