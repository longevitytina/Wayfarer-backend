const mongoose = require("mongoose");
const dbUrl = process.env.MONGODB_URI;

// connect to the DB
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

// TODO: export the User
module.exports = {
  User: require("./User"),
  City: require("./City"),
  Post: require("./Post"),
};
