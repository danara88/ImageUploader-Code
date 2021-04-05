const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreationIndex: true,
            useFindAndModify: false
        });
        console.log('Database is connected !');
    } catch (err) {
        console.log('Something went wrong with database connection', err);
    }
}

module.exports = {
    connectDB
}