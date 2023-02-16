const mongoose = require("mongoose");
const mongooseURI = require("./models/pass");

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

