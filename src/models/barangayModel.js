const mongoose = require('mongoose')

const barangaySchema = mongoose.Schema({
    name: {type:String, required: true},
    totalConfirmed: {type: Number, required: true},
    totalRecovered: {type: Number, required: true},
    totalDeath: {type: Number, required: true},
    reportDate: {type: String, required:true}
})

const barangayModel = mongoose.model('barangay', barangaySchema)
module.exports = barangayModel