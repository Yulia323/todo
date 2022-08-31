import mongoose from 'mongoose';

const Todo = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
})

export default mongoose.model('Todo', Todo)