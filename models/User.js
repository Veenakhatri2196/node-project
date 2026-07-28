const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },

    address: {
        street: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        country: {
            type: String,
            required: true
        }
    },

    loginId: {
        type: String,
        required: true,
        unique: true,
        match: /^[A-Za-z0-9]{8}$/
    },

    password: {
        type: String,
        required: true,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
