const { Schema, model, Types } = require('mongoose');
// using date format that was used in module lesson
const dateFormat = require('../utils/dateFormat');

// create reaction Schema for thought schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            // set min/max lengths
            min: 1,
            max: 280
        },
        username: {
            type: String,
            required: true,
            // references the User model name
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters:true
        }
    }
);

// creates schema for new thought
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            // set min/max lengths
            min: 1,
            max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
            // references user model name
            ref: 'User'
        },
        // fills array with reactions created from users
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// get total of reactions
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// creates the thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;