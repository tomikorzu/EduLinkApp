export const validateUsername = (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }
  if (!/^.{4,20}$/.test(username)) {
    return res
      .status(400)
      .json({ message: "Username must be between 4 and 20 characters" });
  }
  if (!/^\S+$/.test(username)) {
    return res.status(400).json({ message: "Username cannot contain spaces" });
  }
  if (!/^[A-Za-z][A-Za-z0-9_.]*$/.test(username)) {
    return res.status(400).json({
      message:
        "Username must start with a letter and contain only letters, numbers, underscores, and dots",
    });
  }
  if (/^(?!\d+$)[A-Za-z0-9_.]+$/.test(username) === false) {
    return res
      .status(400)
      .json({ message: "Username cannot contain only numbers" });
  }
  next();
};

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (!/^\S+$/.test(email)) {
    return res.status(400).json({ message: "Email cannot contain spaces" });
  }
  next();
};

export const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!/^.{8,}$/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }
  if (!/^(?=.*[A-Z]).+$/.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one uppercase letter" });
  }
  if (!/^\S+$/.test(password)) {
    return res.status(400).json({ message: "Password cannot contain spaces" });
  }
  next();
};

export const validateFullname = (req, res, next) => {
  const { fullname } = req.body;
  if (!fullname) {
    return res.status(400).json({ message: "Fullname is required" });
  }
  if (!/^.{4,50}$/.test(fullname)) {
    return res
      .status(400)
      .json({ message: "Fullname must be between 4 and 50 characters" });
  }
  if (!/^[A-Za-z\s]+$/.test(fullname)) {
    return res
      .status(400)
      .json({ message: "Fullname must contain only letters" });
  }
  if (!fullname.includes(" ")) {
    return res
      .status(400)
      .json({ message: "Fullname must consist of at least two words" });
  }
  next();
};

export const validateAll = (req, res, next) => {
  validateUsername(req, res, (err) => {
    if (err) return;
    validateEmail(req, res, (err) => {
      if (err) return;
      verifyPassword(req, res, (err) => {
        if (err) return;
        validateFullname(req, res, (err) => {
          if (err) return;
          next();
        });
      });
    });
  });
};
