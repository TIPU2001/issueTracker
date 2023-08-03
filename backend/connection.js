const mongoose = require('mongoose');

const dbUrl=`mongodb+srv://tipubaba998:1234@cluster0.xtrley7.mongodb.net/issuetracker?retryWrites=true&w=majority`;

//const res = await mongoose.connect(dbUrl);


mongoose.connect(dbUrl)
.then((result) => {
    console.log('connected to MongoDB');
}).catch((err) => {
console.error(err);    
});

module.exports= mongoose;