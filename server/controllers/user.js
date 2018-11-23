const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

exports.auth = function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({
        errors: [
          { title: "Data Missing", detail: "Provide email and password" }
        ]
      });
  }

  User.findOne({ email }, (err, user) => {
    if (err)
      return res.status(422).send({ errors: normalizeErrors(err.errors) });

    if (!user) {
      return res
        .status(422)
        .send({
          errors: [{ title: "Invalid User", detail: "User does not exist" }]
        }); //Umprocesable entity
    }

    if (user.isSamePassword(password)) {
      //JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username
        },
        SECRET,
        {
          expiresIn: "1h"
        }
      );

      return res.json(token);
    }

    return res
      .status(422)
      .send({
        errors: [{ title: "Wrong Data", detail: "Wrong email or password. " }]
      }); //Umprocesable entity
  });
};

exports.register = function(req, res) {
  const { username, email, password, passwordConfirmation } = req.body;

  if (password !== passwordConfirmation) {
    return res
      .status(422)
      .send({
        errors: [
          {
            title: "Invalid Password",
            detail: "Password is not same as confirmation"
          }
        ]
      });
  }

  if (!email || !password) {
    return res
      .status(422)
      .send({
        errors: [
          { title: "Data Missing", detail: "Provide email and password" }
        ]
      });
  }

  // See if user with given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      //this will eventually be handled by your error handling middleware in case of next()
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res
        .status(422)
        .send({
          errors: [{ title: "Invalid Email", detail: "Email is in use" }]
        }); //Umprocesable entity
    }
    // If a user with email; does not exist , create and save user record
    const user = new User({
      username: username,
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      // Respond to request indicating the user was created
      return res.json({ registered: true });
    });
  });
};

exports.authMiddleware = function(req, res, next) {
  const token = req.headers.authorization;
  console.log(req.body);
  if (token) {
    const user = parseToken(token);

    User.findById(user.id, (err, user) => {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (user) {
        res.locals.user = user;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  return jwt.verify(token.split(" ")[1], SECRET);
}

function notAuthorized(res) {
  return res
    .status(401)
    .send({
      errors: [
        { title: "Not Authorized", detail: "You need to login to access." }
      ]
    });
}
