const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/work")

.then((result) => {
    console.log("db is connected");
    
}).catch((err) => {
    console.log(err);
    
});