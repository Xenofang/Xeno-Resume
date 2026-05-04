import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Resume from './models/resumeModel.js';
import User from './models/userModel.js';

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const userCount = await User.countDocuments();
        const resumeCount = await Resume.countDocuments();

        console.log(`Total Users: ${userCount}`);
        console.log(`Total Resumes: ${resumeCount}`);

        if (resumeCount > 0) {
            const latestResumes = await Resume.find().sort({ createdAt: -1 }).limit(5);
            console.log('\nLatest Resumes:');
            latestResumes.forEach(r => {
                console.log(`- Title: ${r.title}, User: ${r.user}, ID: ${r._id}`);
            });
        }

        process.exit(0);
    } catch (error) {
        console.error('Error checking DB:', error);
        process.exit(1);
    }
};

checkDB();
