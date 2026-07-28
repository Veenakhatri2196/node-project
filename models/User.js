const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: [true, "First Name is required"]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"]
    },

    mobile: {
        type: String,
        required: [true, "Mobile Number is required"],
        match: [
            /^[0-9]{10}$/,
            "Mobile Number must contain exactly 10 digits."
        ]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            "Please enter a valid Email Address."
        ]
    },

    address: {

        street: {
            type: String,
            required: [true, "Street is required"]
        },

        city: {
            type: String,
            required: [true, "City is required"]
        },

        state: {
            type: String,
            required: [true, "State is required"]
        },

        country: {
            type: String,
            required: [true, "Country is required"]
        }

    },

    loginId: {
        type: String,
        required: [true, "Login ID is required"],
        unique: true,
        match: [
            /^[A-Za-z0-9]{8}$/,
            "Login ID must be exactly 8 alphanumeric characters."
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/,
            "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one special character."
        ]
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);