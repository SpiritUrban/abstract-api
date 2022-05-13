import mongoose from 'mongoose';

const User = mongoose.model('User', {
    room: String,
    language: String,
    isLogged: { type: Boolean, default: true }, // when you get user, its mean that you are logged
    shouldLogout: Date,
    //oauthID: Number,
    created: Date,
    name: String,

    // deprecated
    full_name: String,
    first_name: String,
    last_name: String,

    // new
    fullName: String,
    firstName: String,
    lastName: String,

    nickname: String,
    purchases_made: [],
    saved_numbers: [],
    username: { type: String, index: true, required: true, unique: true },
    open_password: String,
    password: { type: String },
    email: { type: String, unique: true },
    email_token: String,
    email_verif: Boolean,
    status: String,
    iss: String,
    role: String,
    date_of_birth: Date,
    phone_verif: Boolean,
    active: Boolean,
    last_login: { type: Date, default: Date.now },
    last_ip: String,
    avatar: String,
    send_notifications: Boolean,
    address1: String,
    address2: String,
    address3: String,
    city: String,
    postcode: String,
    country: String,
    phone: String,
    ever_cha: String,
    ever_sec: String,
    pver_cha: String,
    auth_token: String,
    ass_token: String,
    // wallets
    wallets: {
        USD: {
            balance: Number
        }
    },
    //
    facebook: {
        id: String,
        token: String,
        email: String,
        username: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        username: String
    },
    linked_users: [],
    link_pin: Number,
    // wallets: [walletSchema],
    // cars: [carSchema],
    phone_pin: Number,
    //numeric_id: { type: Number, index: { unique: true } },
    last_appeal: { type: Date, default: Date.now },
    last_method: String,
    gender: String,
    skills: String,
    specialization: String
});


// //Schema
// let walletSchema = new Schema({
//     wallet_name: { type: String, index: true },
//     wallet_id: { type: String, index: { unique: true } },
//     currency: { type: String, required: true },
//     balance: Number,
//     active: Boolean
// }, { minimize: false, timestamps: true });

// let carSchema = new Schema({
//     reg_plate: { type: String, index: true },
//     primary: Boolean,
//     show_to_public: Boolean,
//     make: String,
//     model: String,
// }, { minimize: false, timestamps: true });


export default User;