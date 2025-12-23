const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    bannerUrl: String,
    title: String,
    gender: {
        type: String,
        enum: ["boys", "girls"]
    },
    description: String,    // html
    specialFeatures: String, // html
    ageRange: String,
    duration: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Program', ProgramSchema);
