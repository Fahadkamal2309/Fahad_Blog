import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    description: {      
        type: String,
        required: true,
    },
    picture:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    category: {
    type: String,
    required: true,
    lowercase: true
},
    createdDate:{
        type: Date,
    },
    comments: [
    {
        username: String,
        text: String,
        createdDate: {
            type: Date,
            default: new Date()
        }
    }
],
});

const post = mongoose.model('Post', postSchema);
export default post;