const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://mymognodbuser:mymongodbpassword@cluster0.okwas.mongodb.net/<dbname>?retryWrites=true&w=majority';

module.exports = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'image_stylizer',
    })
    .then(() => console.log("Connected to Mongo DB."))
    .catch((err) => console.log(err));
};
