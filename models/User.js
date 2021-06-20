const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// screate the schema for creating a user
const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /.+\@.+\..+/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get total number of users friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.length +1, 0);
});

// create user model
const User = model('User', UserSchema);

// export user model
module.exports = User;