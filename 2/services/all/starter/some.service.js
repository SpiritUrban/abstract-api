const level = '../../';
const { log, pro, lex } = require(`${level}my_modules/staff`);
const { ChatMsg } = require(`${level}models`);

const self = {

    get: async (_id, ip) => {
        // const hotels = (_id) ?
        //     await Hotel.findOne({ _id }) :
        //     (ip) ?
        //         await Hotel.find({ ip }) :
        //         await Hotel.find({});
        // return { hotels };
    },

    add: async (msg) => {
        // await self.create(msg);
        // return 'ready';
    },

    create: async (msg) => {
        // await new Hotel({
        //     hotel: msg.hotel,
        //     administrator: msg.administrator,
        //     email: msg.email,
        //     ip: msg.ip
        // }).save();
    },

    del: async (_id) => {
        // await self.remove(_id);
        // return 'ready';
    },

    remove: async (_id) => {
        // await Hotel.findOneAndRemove({ _id });
    },

    edit: async (msg) => {
        // await Hotel.findByIdAndUpdate({ _id: msg._id }, {
        //     hotel: msg.hotel,
        //     administrator: msg.administrator,
        //     email: msg.email,
        //     ip: msg.ip,
        //     map: msg.map
        // });
    },

}

module.exports = self;