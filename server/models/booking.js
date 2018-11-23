const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    endAt: { type: Date, required: "Ending date is required" },
    startAt: { type: Date, required: "Starting date is required" },
    totalPrice: Number,
    days: Number,
    guests: Number,
    createdAt: { type: Date, default: Date.now() },
    totalPrice: Number,
    rental: { type: Schema.Types.ObjectId, ref: 'Rental' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Booking', BookingSchema);