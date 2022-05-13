import mongoose from 'mongoose';

// create a Msg model
var ChatMsg = mongoose.model('ChatMsg', {
    type: String,
    path: String, // path to audio file of message
    text: Object,
    // phraseId: String,
    // phrase: Object,

    from: String,
    to: String,

    // from_id: String, // _id of user
    // to_id: String, // _id of user 

    // from_type: String, // type of user
    // to_type: String, // type of user 'visitor', 'admin', 'main-admin', 'super-admin',

    // flow: String, // visitor _id message flow
    checked: { type: Boolean, default: false },

    // solved: Boolean,
    // analogs: [],
    // enabled: Boolean,
    created: { type: Date, default: Date.now },
});

export default ChatMsg;