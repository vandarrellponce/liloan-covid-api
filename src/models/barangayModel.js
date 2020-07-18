const mongoose = require('mongoose')

const barangaySchema = mongoose.Schema({
    name: {type:String, required: true},
    totalC: {type: Number, required: true},
    totalD: {type: Number, required: true},
    totalR: {type: Number, required: true},
    reportDate: {type: String, required:true}
})

const barangayModel = mongoose.model('barangay', barangaySchema)
module.exports = barangayModel