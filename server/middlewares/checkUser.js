export const checkUser = (req, res, next) => {
  const { emailOrUsername, password } = req.body;
  if (!emailOrUsername) {
    return res.status(400).json({ message: "Email or username is required" });
  } else if (!password) {
    return res.status(400).json({ message: "Password is required" });
  } else {
    next();
  }
};
