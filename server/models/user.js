const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, min: [4, "Too short, min 4 characters"], max: [32, "Too long, max 32 characters"], required: "Username is required" },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        min: [4, "Too short, min 4 characters"],
        max: [32, "Too long, max 32 characters"],
        required: "Password is required"
    },
    rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

const saltRounds = 10;

userSchema.methods.isSamePassword = function (requestedPassword) {

    return bcrypt.compareSync(requestedPassword, this.password);

}

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            next();
        });
    });
})


module.exports = mongoose.model('User', userSchema);