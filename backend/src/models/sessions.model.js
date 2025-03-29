import mongoose  from 'mongoose'

const sessionSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId
    },
    sessionStart: { 
        type: Date, 
        default: Date.now 
    },
    sessionEnd: { 
        type: Date,
         default: null 
    },
})

export const sessionModel = mongoose.model("Session", sessionSchema);