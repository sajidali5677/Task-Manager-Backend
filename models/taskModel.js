const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    head : String,
    details : String,
    duedate :String,

});

const task = mongoose.model("task",taskModel);
module.exports = task;