const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        name: {type: String, required: true},
        password: {type: String, required: true},
        count: {type: Number, required: false, default: 1},
        CpS: {type: Number, required: false, default: 0},
        CpC: {type: Number, required: false, default: 1},
        upgrades: {type: [String], required: false},
        buildings: [{
            name: {type: String},
            quantity: {type: Number},
            nextCost: {type: Number}
        }]
    }
)

module.exports = mongoose.model('user', userSchema)