import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    jobTitle: { type: String },
    company: { type: String },
    dates: { type: String },
    description: { type: String },
    achievements: [{ type: String }],
});

const educationSchema = new mongoose.Schema({
    school: { type: String },
    degree: { type: String },
    location: { type: String },
    dates: { type: String },
    description: { type: String },
});

const projectSchema = new mongoose.Schema({
    projectName: { type: String },
    link: { type: String },
    techStack: { type: String },
    description: { type: String },
});

const skillSchema = new mongoose.Schema({
    category: { type: String },
    items: [{ type: String }],
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
        // Flattening to match frontend formData
        formData: {
            name: { type: String },
            email: { type: String },
            phone: { type: String },
            summary: { type: String },
            experience: [experienceSchema],
            education: [educationSchema],
            projects: [projectSchema],
            skills: [skillSchema],
            customSections: {
                links: [{ label: String, url: String }],
                awards: [{ title: String, date: String, issuer: String }],
                certifications: [{ title: String, date: String, issuer: String }],
            },
        },
        settings: {
            template: { type: String, default: 'modern' },
            accentColor: { type: String, default: '#3B82F6' },
        },
        atsScore: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
