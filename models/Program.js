const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    title: String,
    gender: {
        type: String,
        enum: ["boys", "girls"]
    },
    description: String,
    ageRange: String,
    duration: String,
    dailySchedule: [
        {
            day: String,
            activities: [
                {
                    title: String,
                    description: String,
                    category: String
                }
            ]
        }
    ],
    learningOpportunities: [
        {
            title: String,
            description: String
        }
    ],
    specialFeatures: [
        {
            type: String
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Program', ProgramSchema);
