const mongoose = require("mongoose")

const userCards = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    card_number: {
        type: String,
        required: true,
    },
    expiration_date: {
        type: String,
        required: true,
    },
    card_verify: {
        type: String,
        required: true,
        default: false,
    },
    amount: {
        type: String,
        required: true,
        default: false,
    }
})

const user_card = mongoose.model("user_card", userCards);

module.exports = user_card;