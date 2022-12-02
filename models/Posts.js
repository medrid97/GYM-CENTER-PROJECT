const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    idname:{
        type: String,
        required:true,
        unique:false,
    },
    idemail:{
        type:String,
        required:true,
        unique:false,
    },
    idsubject:{
        type:String,
        required:false,
        unique:false,
    },
    idmsg:{
        type:String,
        required:false,
    }
},
    {timestamps:true}
)
module.exports = mongoose.model("post", PostSchema);