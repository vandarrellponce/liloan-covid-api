const mongoose = require('mongoose')

const dailySchema = mongoose.Schema({
    totalConfirmed: {type: Number, required: true},
    totalDeath: {type: Number, required: true},
    totalRecovered: {type: Number, required: true},
    reportDate: {type: String, required: true},
    newConfirmed: {type: Number, required: true},
    newDeath: {type: Number, required: true},
    newRecovered: {type: Number, required: true}
})

const dailyModel = mongoose.model('daily', dailySchema)

module.exports = dailyModel