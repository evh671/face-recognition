const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  console.log("Sign-in email:", email);
  console.log("Sign-in password:", password);

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);

      console.log("data", data);
      console.log("isValid:", isValid);

      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("Unable to get user!"));
      } else {
        res.status(400).json("Email or Password are incorrect!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Email or Password are incorrect!");
    });
};

module.exports = {
  handleSignin: handleSignin,
};