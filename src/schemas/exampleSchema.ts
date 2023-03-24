import mongoose from 'mongoose'

const example = new mongoose.Schema({
    example: String,
})

export default mongoose.model('example', example)