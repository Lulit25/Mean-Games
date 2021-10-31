const mongoose = require("mongoose");
const dbURL = process.env.DB_URL+process.env.DATABASE_NAME;
require('./games-model.js')
require('./users-model.js')

mongoose.connect(dbURL);

mongoose.connection.on("connected", function(){
    console.log("connected to database");

});
mongoose.connection.on("disconnected", function(){
    console.log("disconnected from database");

});
mongoose.connection.on("error", function(){
    console.log("error connecting to database");

});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("terminated by application");
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("terminated by application");
        process.exit(0);
    });
})
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("terminated by application");
        process.kill(process.pid, "SIGUSR2");
    });
});

