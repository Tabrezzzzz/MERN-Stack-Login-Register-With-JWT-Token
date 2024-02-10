const mongoose = require("mongoose");

const connectDatabase = async () =>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Your Database has been successfully connected to ${connect.connection.host}`)
    }
    catch(error){
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    connectDatabase,
};

