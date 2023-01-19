const mongoose = require("mongoose");
const mongooseURI = "mongodb://Shubham:9013684040@ac-d3btdft-shard-00-00.4w5xiol.mongodb.net:27017,ac-d3btdft-shard-00-01.4w5xiol.mongodb.net:27017,ac-d3btdft-shard-00-02.4w5xiol.mongodb.net:27017/CouchPotato?ssl=true&replicaSet=atlas-3222at-shard-0&authSource=admin&retryWrites=true&w=majority";

const Data = [];
mongoose.set('strictQuery', false);
const mongoDB = async () => {
    await mongoose.connect(mongooseURI, { useNewUrlParser: true })
        .then(async () => {
            console.log("successful..")
            const fetched_data = await mongoose.connection.db.collection("foot_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const food_category = await mongoose.connection.db.collection("foot_category");
                food_category.find({}).toArray(async function (err, catData) {
                    if (!err) {
                        global.food_category = catData;
                        global.food_items = data;
                    }
                    else {
                        console.log(err)
                    }
                })
            });
        })
        .catch((err) => console.log("Error..."));
}

module.exports = mongoDB;

