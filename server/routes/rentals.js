const express = require("express");
const router = express.Router();

const Rental = require("../models/rental");
const UserCtrl = require("../controllers/user");
const RentalCtrl = require("../controllers/rental");
const { normalizeErrors } = require("../helpers/mongoose");

router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

router.get("/manage", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.where({ user })
    .populate("bookings")
    .exec(function(err, foundRentals) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      return res.send(foundRentals);
    });
});

router.delete("/:id", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user", "_id")
    .populate({
      path: "bookings",
      select: "startAt",
      match: { startAt: { $gt: new Date() } }
    })
    .exec(function(err, foundRental) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [
            { title: "Inválid User", detail: `Your are not rental owner.` }
          ]
        });
      }

      if (foundRental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: "Active Bookings",
              detail: `Cannot delete rentals with active bookings.`
            }
          ]
        });
      }

      foundRental.remove(function(err) {
        if (err)
          return res.status(422).send({ errors: normalizeErrors(err.errors) });

        res.send({ status: "deleted" });
      });
    });
});

router.get("", function(req, res) {
  const { city } = req.query;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select("-bookings")
    .exec(function(err, found) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (found.length === 0 && city) {
        return res.status(422).send({
          errors: [
            {
              title: "Rentals not found",
              detail: `There are no rentals for city ${city}`
            }
          ]
        });
      }

      return res.json(found);
    });
});

router.post("", UserCtrl.authMiddleware, RentalCtrl.createRentals);

router.get("/:id", function(req, res) {
  const rentalId = req.params.id;

  Rental.findById(rentalId)
    .populate("user", "username -_id")
    .populate("bookings", "startAt endAt -_id")
    .exec(function(err, found) {
      if (err) {
        return res.status(422).send({
          errors: [{ title: "Rental Error", detail: "Could not find Rental" }]
        });
      }
      return res.json(found);
    });
});

router.get("/:id/verify-user", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user")
    .exec(function(err, foundRental) {
      console.log(err);
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [{ title: "Invalid User", detail: "You are not the owner." }]
        });
      }

      return res.send({ status: "verified" });
    });
});

router.patch("/:id", UserCtrl.authMiddleware, function(req, res) {
  const rentalData = req.body;
  const user = res.locals.user;

  Rental.findById(req.params.id)
    .populate("user")
    .exec(function(err, foundRental) {
      if (err)
        return res.status(422).send({ errors: normalizeErrors(err.errors) });

      if (!foundRental) {
        return res.status(422).send({
          errors: [{ title: "Rental Error", detail: "Could not find Rental" }]
        });
      }

      if (user.id !== foundRental.user.id) {
        return res.status(422).send({
          errors: [{ title: "Invalid User", detail: "You are not the owner." }]
        });
      }

      foundRental.set(rentalData);
      foundRental.save(function(err, updatedRental) {
        if (err)
          return res.status(422).send({ errors: normalizeErrors(err.errors) });

        return res.send(updatedRental);
      });
    });
});

module.exports = router;
