import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String },
    achievements: [{ type: String }], // AI enhanced bullets
});

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Resume title is required'],
            default: 'Untitled Resume',
        },
        personalInfo: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, required: true },
            phone: { type: String },
            location: { type: String },
            website: { type: String },
            linkedIn: { type: String },
            github: { type: String },
        },
        summary: {
            type: String, // AI can enhance this
        },
        experience: [experienceSchema],
        education: [educationSchema],
        skills: [{ type: String }],
        // Additional sections can be added (projects, certifications)
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
