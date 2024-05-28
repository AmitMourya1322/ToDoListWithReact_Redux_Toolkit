import mongoose from "mongoose";

const toDoSchema = mongoose.Schema({
    item:{
        type: String,
        required:true,
    }
},{
    timestamps:true
})

const list = mongoose.model('list',toDoSchema);
export default list;
