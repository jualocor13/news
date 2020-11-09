const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required:true
    },
    author: {
        type:String,
        required:true
    },
    archiveDate: {
        type: Date
    },
    archived: {
        type: Boolean,
        default: false
    }

}, {timestamps:true});

newSchema.plugin(mongoosePaginate);
newSchema.index({'title':1});

newSchema.statics.filterQuery = function (news, callback) {
    return callback(null, {
    });
};

newSchema.statics.mapObject = function (newDBObject, newObject) {
    if (!newDBObject) {
        newDBObject = new news();
    }
    Object.keys(newObject).forEach(function (key){
        newDBObject[key] = newObject[key];
        if (newObject[key] == null) {
            newDBObject[key] = undefined;
        }
    });
    newDBObject["archiveDate"] = Date.now();
    return newDBObject
}
let news = mongoose.model('new', newSchema);
module.exports = news;