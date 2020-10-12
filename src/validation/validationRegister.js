const alphanumeric = /^[a-zA-Z0-9ĄąĘęÓóŁłŚśĄąŻżŹźĆćŃń]*$/gm;
const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validationRegister = (email, password, passwordCheck) => {
  if (!email) {
    throw new Error("Please enter email");
  }
  if (!email.match(mailformat)) {
    throw new Error("Email is not correct");
  }
  if (!password) {
    throw new Error("Please enter password");
  }
  if (!password.match(alphanumeric)) {
    throw new Error("Password must contain only numbers and letters");
  }

  if (password.length < 7) {
    throw new Error("The minimum password length is: 7");
  }

  if (password !== passwordCheck) {
    throw new Error("Password must be the same as the veryfy password");
  }
  return false;
};

export default validationRegister;
