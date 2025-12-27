const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    gender: {
        type: String,
        enum: ["boys", "girls", "both"],
    },
    description: String,
    specialFeatures: String,
    ageRange: String,
    duration: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Program', ProgramSchema);
