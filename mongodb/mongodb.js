

const mongoose = require("mongoose")
require('../models/user')

const uri = 'mongodb+srv://abdulaziz:3536665Aa@cluster0.islze.mongodb.net/mongo?retryWrites=true&w=majority'

async function mongo(){
    try {
        await mongoose.connect(uri)

    } catch (error) {
        console.error("MONGO_ERROR", error = '')
    }
}

module.exports = mongo 