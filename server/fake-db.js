const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');

const fakeDBData = require('./data.json');

class FakeDB {
    constructor() {
        this.rentals = fakeDBData.rentals;
        this.users = fakeDBData.users;
    }

    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDataToDB() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);


        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);

            newRental.save();
        })

        user.save();
        user2.save();
    }

    async seedDb() {
        await this.cleanDb();
        await this.pushDataToDB();
    }
}

module.exports = FakeDB;