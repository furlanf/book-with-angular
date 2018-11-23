

const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');

exports.createRentals = function (req, res) {
    const { title, city, street, category, image, bedrooms, shared, description, dailyRate } = req.body;

    const user = res.locals.user;

    const rental = new Rental({ title, city, street, category, image, bedrooms, shared, description, dailyRate });
    rental.user = user;

    Rental.create(rental, function (err, newRental) {

        if (err) return res.status(422).send({ errors: normalizeErrors(err.errors) });

        User.update({ _id: user.id }, { $push: { rentals: newRental } }, function () { });

        return res.json(newRental);
    })
}