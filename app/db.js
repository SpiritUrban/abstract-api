import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { log } from '../my_modules/staff.js';

mongoose.connect(`mongodb+srv://user:${process.env.DB_PASS}@cluster0-bpnma.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    // require('mongoose').connect('mongodb://localhost/', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(() => log('\n DB Connected!'.info))
    .catch(err => log(`DB Connection Error: ${err.message}`));

export default null;