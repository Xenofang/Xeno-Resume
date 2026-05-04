import mongoose from 'mongoose';

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
        formData: {
            type: Object,
            required: true
        },
        settings: {
            template: { type: String, default: 'modern' },
            accentColor: { type: String, default: '#3B82F6' }
        },
        atsScore: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
