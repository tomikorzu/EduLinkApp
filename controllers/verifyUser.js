export const verifyUsername = (username) => {
  if (!username) {
    return "Username is required";
  } else if (!/^.{4,}$/.test(username)) {
    return "Username must be at least 4 characters";
  } else if (!/^\S+$/.test(username)) {
    return "Username cannot contain spaces";
  } else if (!/^.{1,20}$/.test(username)) {
    return "Username must not exceed 20 characters";
  } else if (!/^[A-Za-z][A-Za-z0-9_\.]*$/.test(username)) {
    return "Username must contain only letters, numbers, underscores, and dots";
  } else if (!/^[A-Za-z][A-Za-z0-9_\.]*$/.test(username)) {
    return "Username cannot start with a number";
  } else if (/^(?!\d+$)[A-Za-z0-9_\.]+$/.test(username) === false) {
    return "Username cannot contain only numbers";
  } else {
    return true;
  }
};

export const verifyEmail = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Invalid email format";
  } else if (!/^\S+$/.test(email)) {
    return "Email cannot contain spaces";
  } else {
    return true;
  }
};

export const veriyPassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (!/^.{8,}$/.test(password)) {
    return "Password must be at least 8 characters";
  } else if (!/^(?=.*[A-Z]).+$/.test(password)) {
    return "Password must contain at least one uppercase letter";
  } else if (!/^\S+$/.test(password)) {
    return "Password cannot contain spaces";
  } else {
    return true;
  }
};

export const verifyFullname = (fullname) => {
  if (!fullname) {
    return "Fullname is required";
  } else if (!/^.{4,}$/.test(fullname)) {
    return "Fullname must be at least 4 characters";
  } else if (!/^[A-Za-z\s]+$/.test(fullname)) {
    return "Fullname must contain only letters";
  } else if (!/^.{1,50}$/.test(fullname)) {
    return "Fullname must not exceed 50 characters";
  } else if (!/^[A-Za-z]+(?:\s[A-Za-z]+)+$/.test(fullname)) {
    return "Fullname must consist of at least two words";
  } else if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(fullname)) {
    return "Fullname must not have extra spaces";
  } else {
    return true;
  }
};

export const verifyAll = (username, email, password, fullname) => {
  const usernameCheck = verifyUsername(username);
  const emailCheck = verifyEmail(email);
  const passwordCheck = veriyPassword(password);
  const fullnameCheck = verifyFullname(fullname);

  if (usernameCheck !== true) {
    return usernameCheck;
  } else if (emailCheck !== true) {
    return emailCheck;
  } else if (passwordCheck !== true) {
    return passwordCheck;
  } else if (fullnameCheck !== true) {
    return fullnameCheck;
  } else {
    return true;
  }
};
