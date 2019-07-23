const config = require('../config/config');
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const {
    db: {
        host,
        port,
        name
    }
} = config.config;

const connectionString = `mongodb://${host}/${name}`;

mongoose.connect(connectionString, { useNewUrlParser: true });

// var email_regex = /[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/;

const ChatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Must include a message!"]
    },
    meta: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        delivered: Boolean,
        read: Boolean
    }]
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }},
    {timestamps: true}
)

mongoose.model("Chat", ChatSchema);
mongoose.model("User", UserSchema);
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');

UserSchema.plugin(uniqueValidator, {message: "This user already exists in our database!"})
mongoose.Promise = global.Promise;

module.exports = {
    User: User,
    Chat: Chat
}
