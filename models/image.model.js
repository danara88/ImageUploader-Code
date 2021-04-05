const moment = require('moment');
const { Schema, model } = require('mongoose');

const ImageSchema = Schema({
    user: {
        type: Schema.ObjectId, 
        ref: 'User',
        require: [true, 'User id is required']
    },
    path: {
        type: String,
        required: [true, 'Image is required']
    },
    createdAt: {
        type: String,
        default: moment().unix()
    }
});

ImageSchema.methods.toJSON = function() {
    const { __v, ...image } = this.toObject();
    return image;
}


module.exports = model('Image', ImageSchema);