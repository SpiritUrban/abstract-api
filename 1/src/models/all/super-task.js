import mongoose from 'mongoose';

var SuperTask = mongoose.model('SuperTask', {
    aim: String,
    aimCoordinates: String,
    type: String,
    need: String,
    done: Boolean,
    status: String,
    created: { type: Date, default: Date.now },
});

export default SuperTask;


    // to: String, // _id of user
    // creator: String, // _id of user
    // adId: String,
    // hour: String,
    // minute: String,
    // day: String,
    // month: String,
    // year: String,
    // date: Date,
    // monthNumber: String,
    // advertising: Object,
    // text: String,