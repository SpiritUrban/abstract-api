const level = '../../';
import { log, pro, lex } from '../../my_modules/staff.js';
import { App } from '../../models/index.js';

const self = {

    createIfAbsent: async () => {
        // Сheck if the App Settings exists - Don't add duplicate Settings
        if (!await App.findOne()) await new App({
            name: 'Example Hotel',
            hotel: {
                map: {
                    coordinates: {
                        x: 0,
                        y: 0,
                    }
                }
            }
        }).save();
        return 'ok'
    },

    saveInfo: async (info) => {
        self.createIfAbsent();
        return await App.findOneAndUpdate({}, info);
    },

    getInfo: async () => {
        self.createIfAbsent();
        return await App.findOne({});
    },

    getInfoSafe: async () => {
        self.createIfAbsent();
        const _ = await self.getInfo();
        return {
            name: _.name,
            hotel: {
                map: {
                    coordinates: _.hotel.map.coordinates
                }
            },
            google_api_key: _.google_api_key
        };
    },

    getGoogleApiJSON: async () => {
        const _ = await self.getInfo();
        return JSON.parse(_.google_api_JSON)
    },

}

// module.exports = self;
export default self;