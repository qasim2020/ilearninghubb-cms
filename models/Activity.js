const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    title: String,
    category: {
        type: String,
        enum: [
            "nature-trip",
            "outdoor-games",
            "food",
            "swimming",
            "friendship-building"
        ]
    },
    description: String,
    images: [String],
    details: {
        schedule: String,
        location: String,
        menuSample: [String],
        availabilityNotes: String,
        ageGroup: String
    },
    relatedPrograms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Program"
        }
    ],
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Activity', ActivitySchema);