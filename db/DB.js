const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/marlin01",{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex: true,
    useFindAndModify:true
});
mongoose.connection.once("open", ()=>
     console.log('Mongoose Conectado Sucesso')
);

module.exports = mongoose;